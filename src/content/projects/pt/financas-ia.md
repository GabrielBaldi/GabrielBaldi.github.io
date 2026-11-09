---
title: Finanças com IA
summary: Importa o extrato do banco e categoriza os gastos em camadas, com regras primeiro e IA só no que sobra. Gastos também chegam pelo Telegram e são conferidos com o extrato depois, sem duplicar.
year: 2026
status: done
role: Back-end e IA
stack: [Python, FastAPI, SQLAlchemy, Alembic, Pytest, Claude API, NVIDIA NIM, Telegram Bot API, React, TypeScript]
repoName: financas-ia
cover: ../covers/financas-ia.png
coverAlt: Painel do mês com gastos por categoria e a comparação de gastos e entradas dos últimos seis meses
order: 2
---

## Problema

Controlar gastos em planilha dá trabalho, e quase todo mundo desiste no segundo mês. A parte chata é classificar cada linha do extrato, ainda mais com descrições como `MP *LOJADOZE` ou `DROGARIAPACHECO`. E o gasto do dia a dia (o almoço, o Uber) só aparece no extrato dias depois.

## Solução

A importação passa por um pipeline em camadas, e cada transação guarda qual camada decidiu:

1. **Regras do usuário**: criadas a partir das correções dele.
2. **Regras padrão**: palavras-chave de lojas e termos brasileiros (iFood, Uber, Pix, supermercado, farmácia...).
3. **IA**: o que sobrou vai **numa única requisição** para o Claude ou para um modelo da NVIDIA (configurável), com resposta em JSON schema e lista fechada de categorias.
4. **A revisar**: resposta inválida, confiança abaixo de 0,7, erro de rede ou IA desligada.

Na tela de revisão, ao corrigir uma categoria, o app sugere uma regra e mostra quantas transações parecidas ela cobre. Lê OFX de banco brasileiro (SGML com tags abertas, em Latin-1), CSV do Nubank e CSV genérico, e reimportar o mesmo extrato não duplica nada.

## Lançar gastos pelo celular

Um bot pessoal no Telegram recebe mensagens como `32,90 almoço` ou `uber 23 ontem` e cria o lançamento pelo mesmo pipeline de categorização.

- **Sem abrir porta:** o computador consulta o Telegram (long polling), então nada fica exposto à internet.
- **Só o dono:** o chat é conectado com um código de uso único gerado no app, válido por 10 minutos; 5 códigos errados bloqueiam o chat por 15 minutos.
- **Sem duplicar:** quando o extrato chega, um lançamento do Telegram e uma linha do banco da mesma conta, mesmo valor e até 3 dias de diferença viram uma transação só. Fica a descrição do banco, e o texto do usuário vira uma nota. Funciona nos dois sentidos.

## Quanto acerta

Medido num conjunto de 102 transações fictícias rotuladas à mão, um quarto delas com descrições difíceis de propósito. A IA é o MiniMax M3.1 Flash pela API da NVIDIA, em duas execuções:

| Métrica | Só regras | Regras + IA |
| --- | --- | --- |
| Cobertura (receberam categoria) | 78,4% | 99,0% a 100% |
| Acerto geral ("a revisar" conta como erro) | 76,5% | 97,1% a 98,0% |
| Decisões da IA certas | — | 21 de 21 e 22 de 22 |

Os dois erros que sobram são de regras de palavra-chave, não da IA. Os números tendem a ser otimistas, porque a mesma pessoa escreveu as regras e o conjunto de teste, e 22 transações para a IA são uma amostra pequena.

## IA com responsabilidade

- **Custo previsível:** a IA só vê o que as regras não resolvem, e tudo vai numa chamada.
- **Nunca inventa categoria:** a resposta é validada item por item com Pydantic; um item ruim vai para revisão sem derrubar o lote.
- **Privacidade:** só id, descrição e valor de cada transação saem do servidor.
- **Contra prompt injection:** o prompt trata as descrições como dados do extrato, nunca como instruções.
- **Falha sem quebrar:** se o provedor demora ou cai, o lote vai para revisão; sem chave, o app roda só com regras.

## Decisões técnicas

| Decisão | Alternativa | Por quê |
| --- | --- | --- |
| IA só no que as regras não resolvem | Mandar tudo para a IA | Custo e previsibilidade: 78% já se resolve sem IA. |
| Classificador atrás de um `Protocol` | Código preso a um provedor | Trocar Claude por NVIDIA foi uma implementação nova, sem mexer no pipeline; nos testes entra um falso. |
| API compatível com OpenAI via `httpx2` | Um segundo SDK | A biblioteca HTTP já estava no projeto; o mesmo prompt, esquema e validação servem aos dois provedores. |
| Bot com long polling | Webhook | Roda num computador de casa sem abrir porta nem ter domínio. |
| Conciliação por conta, valor e data (±3 dias) | Marcar duplicados à mão | O lançamento rápido do celular e o extrato do banco se encontram sozinhos. |
| Chaves estrangeiras desligadas na migration do SQLite | Migration padrão | No SQLite, recriar a tabela de usuários apagaria em cascata contas e transações; um teste de controle mostrou isso antes de ir para produção. |

## Qualidade

- 271 testes com pytest e 99% de cobertura: parsers, cada camada do pipeline, os dois provedores de IA com servidores falsos, o bot contra uma API do Telegram falsa, a conciliação e a migration sobre um banco com dados.
- ruff e mypy em modo estrito sem nenhum aviso; front-end em React com TypeScript estrito e 19 testes com Vitest, tudo no GitHub Actions.

## Próximos passos

- Medir regras + IA num extrato real e publicar os números.
- Rodar o bot como serviço do Windows, sem depender da janela do app aberta.
- Filtro por conta na revisão e edição de regras.
- Testes contra Postgres e de ponta a ponta no CI.
