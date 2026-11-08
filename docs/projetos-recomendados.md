# Que projetos colocar no portfólio

Pesquisa feita em novembro de 2026 em artigos de recrutadores, blogs técnicos e discussões de devs (inclusive brasileiras). As fontes estão no fim.

**Ressalva:** quase tudo vem de blogs e fóruns, não de dados de contratação. O portfólio ajuda a **conseguir a entrevista**. Quem decide a contratação é a entrevista, então saber explicar cada linha do que você fez pesa tanto quanto o projeto.

## 1. Os tipos de projeto que mais funcionam

Em ordem de força. Os marcados com ✔ tiveram consenso entre várias fontes.

1. **Ferramenta que resolve um problema real, com usuário de verdade** ✔. Mostra visão de produto e rende uma boa história na entrevista. Exemplo: agendamento para a barbearia de um conhecido.
2. **App full-stack completo** (autenticação, banco, testes, CI e deploy) ✔. Hoje isso é o mínimo esperado de um full-stack, não um diferencial.
3. **Contribuição open source com PR aceito** ✔. Mostra que você lê código dos outros e aguenta code review. Pode começar corrigindo um bug ou traduzindo a documentação de uma lib que você usa.
4. **IA aplicada dentro de um app que já é útil sem ela.** Um recurso pequeno e bem delimitado, como categorizar gastos. Evite o "wrapper do ChatGPT". A Alura aponta falta de juniores que saibam aplicar IA.
5. **Automação ou infraestrutura**: Docker Compose, pipeline de CI/CD, uma CLI ou um bot que resolve uma tarefa repetitiva. Vagas júnior no Brasil já pedem CI/CD e cloud.
6. **Um projeto que evoluiu por meses**, com changelog, refatorações e versões. Pode ser o mesmo do item 1.
7. **Interface rica com dados públicos**, como um dashboard com APIs do Banco Central ou do IBGE. Conta mais se tiver um back-end por trás.
8. **Clone ou consumo de API, só com uma diferença real.** Clone puro parece tutorial copiado.

## 2. O que faz um projeto se destacar

- **Demo online funcionando.** Se tiver login, deixe uma conta de demonstração com dados. Demo quebrada é pior que não ter demo.
- **README completo:** uma frase dizendo o que o projeto faz, o problema, um print ou GIF, a stack, como rodar localmente, o link da demo e as decisões técnicas.
- **Estudo de caso curto**, de 2 ou 3 parágrafos: problema, decisões, trade-offs e o que você aprendeu. O site já tem uma página para isso em cada projeto.
- **Testes e GitHub Actions** rodando a cada push. Muito júnior ignora testes, então ter testes já te diferencia.
- **Commits frequentes e com mensagens claras.** Isso também prova autoria numa época em que todo mundo usa IA.
- **Números de impacto**, como usuários, agendamentos por semana ou tempo economizado.
- **Transparência sobre IA:** usar IA para programar é normal. Não saber explicar o próprio código é que pega mal.

## 3. O que evitar

- To-do list, app de clima e clone da Netflix ou do Spotify sem nenhuma diferença.
- Dezenas de repositórios abandonados. Cinco projetos bem feitos valem mais que trinta de tutorial.
- Link para `localhost`, demo fora do ar, login sem credencial de teste.
- Muitos projetos: deixe **2 a 4 em destaque** e no máximo **6 repositórios fixados** no GitHub.

## 4. O nosso plano

Três projetos principais que cobrem as linguagens mais pedidas hoje, mais contribuições open source ao longo do caminho. **Os três foram construídos** (novembro de 2026). Cada um está no seu repositório em `C:\Users\Administrator\Desktop\projetos\` e já aparece no site com estudo de caso e capa.

| # | Projeto | Stack usada | Tipos de projeto que cobre |
| --- | --- | --- | --- |
| 1 | **Agenda Fácil**: agendamento para pequenos negócios | TypeScript, Next.js 16, PostgreSQL (PGlite local, Neon em produção), Drizzle, Better Auth, Vitest, Playwright | Problema real, app full-stack completo (login, banco, testes, CI) |
| 2 | **Finanças com IA**: extrato bancário categorizado com IA | Python, FastAPI, SQLAlchemy, Alembic, Pytest, Claude API, React | IA aplicada dentro de um app útil sem ela, back-end sólido |
| 3 | **Painel Econômico**: indicadores do Brasil com dados abertos | Go (só biblioteca padrão), React, TypeScript, SVG | Dados públicos, integração com APIs externas, infraestrutura (cache, retry, binário único, Docker) |
| ∞ | **Open source** | Qualquer uma | Pelo menos 1 PR aceito num projeto que você usa. Só dá para fazer com a sua conta. |

**Alternativa:** se o foco for bancos e grandes empresas no Brasil, um quarto projeto com **Java e Spring Boot** cobre a stack mais pedida nesse segmento.

## 5. Checklist de cada projeto

| Item | Agenda Fácil | Finanças com IA | Painel Econômico |
| --- | --- | --- | --- |
| README com print, como rodar e decisões técnicas | ✔ | ✔ | ✔ |
| Testes automatizados | ✔ 37 unitários + 4 ponta a ponta | ✔ 92 (96% de cobertura) | ✔ 94 casos Go + 83 Vitest |
| Workflow do GitHub Actions | ✔ escrito, falta rodar no GitHub | ✔ escrito, falta rodar no GitHub | ✔ escrito, falta rodar no GitHub |
| Estudo de caso em PT e EN e capa no site | ✔ | ✔ | ✔ |
| Demo online, com conta de teste se tiver login | Falta: Vercel + Neon | Falta: Render + Neon | Falta: Render |
| Commits pequenos, com mensagens claras | Falta: você revisa e commita | Falta | Falta |
| Repositório público e fixado no perfil do GitHub | Falta | Falta | Falta |

Quando cada demo estiver no ar, coloque o link em `demo:` no estudo de caso (`src/content/projects/pt/` e `en/`).

## 6. O que o site já cobre

- No topo: nome, função, stack principal, disponibilidade e links ✔
- Projetos logo abaixo, cada um com stack, status e links para a demo e o código ✔
- Uma página de estudo de caso por projeto ✔
- "Sobre" curto, depois dos projetos ✔
- Contato fácil, com e-mail grande e botão de copiar ✔
- Rápido, funciona no celular, HTML estático ✔
- Versão em inglês para vagas remotas ✔
- Ainda falta: currículo em PDF (`cv` no `profile.ts`) e, mais para frente, artigos curtos no TabNews ou no dev.to

## Fontes

- Substack arslandg, sobre 3 projetos que funcionam (mai/2026): https://arslandg.substack.com/p/3-portfolio-projects-that-actually
- Ask HN, respostas de quem contrata (~2025): https://hn.svelte.dev/item/43134745
- SimeonOnSecurity, "Building a developer portfolio" (jul/2026): https://simeononsecurity.com/software-development-career-playbook/getting-started-in-software-development/building-a-developer-portfolio/
- DevPlaybook, checklist com 20 itens (mar/2026): https://devplaybook.cc/blog/developer-portfolio-checklist-20-things-hiring-managers
- Alura, mercado júnior no Brasil (2026): https://www.alura.com.br/artigos/desenvolvedor-junior
- DIO, o que recrutadores esperam de um júnior (2025): https://www.dio.me/articles/voce-nao-precisa-ser-senior-para-ser-contratado-o-que-recrutadores-esperam-de-um-junior-em-tech-23013da4b1a0
- TabNews, 5 projetos para dev júnior (~2026): https://www.tabnews.com.br/LukeMe/5-projetos-que-seria-legal-todo-dev-junior-ter-no-portfolio
- TabNews, portfólio para back-end (~2025): https://www.tabnews.com.br/joaodias/portifolio-sendo-dev-backend
