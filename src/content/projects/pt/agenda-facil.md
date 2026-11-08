---
title: Agenda Fácil
summary: Agendamento online para barbearias, salões e estúdios. O cliente marca sozinho pelo link, a equipe acompanha a agenda num painel e o banco de dados garante que dois horários nunca se sobrepõem.
year: 2026
status: done
role: Full-stack
stack: [TypeScript, Next.js, React, PostgreSQL, Drizzle, Better Auth, Vitest, Playwright, GitHub Actions]
repoName: agenda-facil
cover: ../covers/agenda-facil.png
coverAlt: Agenda do dia no painel do dono, com uma coluna por profissional, bloqueios de almoço e indicadores de faturamento e ocupação
order: 1
---

## Problema

Muitos pequenos negócios ainda marcam horário pelo WhatsApp. O dono passa o dia respondendo mensagem, às vezes marca duas pessoas no mesmo horário e o cliente esquece do compromisso.

## Solução

- **Página pública por negócio:** o cliente escolhe serviço, profissional (ou "qualquer um"), dia e horário livre, e confirma em poucos toques.
- **Horários livres calculados no servidor:** horário de funcionamento menos agendamentos e bloqueios, de 15 em 15 minutos, sem horários que já passaram.
- **Painel com login:** agenda do dia, com uma coluna por profissional, e agenda da semana. Mostra faturamento previsto e ocupação, e permite cancelamentos, bloqueios (almoço, folga), serviços, horários e equipe.
- **Papéis:** o dono vê tudo, e o profissional vê e altera só a própria agenda. A regra é conferida no servidor, em cada página e em cada ação.
- **Lembrete 24 h antes:** gravado num outbox na mesma transação do agendamento e enviado por um cron.
- **Dados de demonstração:** a "Barbearia Navalha de Ouro", fictícia, com três profissionais e uma semana de agendamentos.

## Conflito impossível

A regra mais importante do produto mora no banco, não só no código:

```sql
ALTER TABLE bookings ADD CONSTRAINT bookings_no_overlap
  EXCLUDE USING gist (staff_id WITH =, tstzrange(starts_at, ends_at, '[)') WITH &&)
  WHERE (status <> 'cancelled');
```

Se dois clientes confirmam o mesmo horário ao mesmo tempo, o PostgreSQL aceita um e recusa o outro (erro `23P01`). O app traduz a recusa em "Esse horário acabou de ser reservado. Escolha outro." e, se o cliente escolheu "qualquer profissional", tenta o próximo livre. Um teste dispara duas requisições simultâneas e confere que só uma vira agendamento.

## Decisões técnicas

| Decisão | Alternativa | Por quê |
| --- | --- | --- |
| Constraint de exclusão no PostgreSQL | Checar sobreposição só no código | A regra vale para qualquer caminho que escreva no banco, inclusive requisições simultâneas e bugs futuros. |
| PGlite (Postgres em WASM) local e nos testes, Neon em produção | Docker Compose com Postgres | Quem clona roda sem Docker, e os testes de integração exercitam o mesmo SQL e a mesma constraint. |
| Better Auth com Drizzle | Auth.js com Credentials | Sessões revogáveis no banco, hash de senha e limite de tentativas de login prontos. |
| Drizzle ORM | Prisma | Consultas que parecem SQL e uma migração escrita à mão para a constraint. |
| Fluxo de agendamento guiado pela URL | Wizard com estado no cliente | Funciona sem JavaScript, e o servidor recalcula os horários a cada passo. |
| Outbox de lembretes na transação do agendamento | Enviar o e-mail na hora | Se o provedor de e-mail cair, nada se perde, e dois crons simultâneos não enviam o mesmo lembrete duas vezes. |

## Qualidade

- 37 testes com Vitest: cálculo de horários (fuso de São Paulo, bloqueios, horários passados), integração com o banco e lembretes.
- 4 testes de ponta a ponta com Playwright: o cliente agenda, o dono vê na agenda, dois clientes disputam o mesmo horário e o profissional só vê a própria agenda.
- ESLint, Prettier e TypeScript estrito, tudo rodando no GitHub Actions.

## Próximos passos

- Horário de funcionamento por profissional.
- Cliente cancelar ou remarcar pelo link do e-mail.
- Lembrete por WhatsApp.
- Levar os bloqueios para dentro da garantia do banco (hoje a aplicação confere os bloqueios).
- Colocar no ar para um negócio real e medir agendamentos por semana.
