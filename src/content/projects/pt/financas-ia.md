---
title: Finanças com IA
summary: Importa o extrato do banco (OFX ou CSV) e categoriza os gastos em camadas, com regras primeiro e IA só no que sobra. Cada transação mostra quem decidiu a categoria, e toda correção vira regra.
year: 2026
status: done
role: Back-end e IA
stack: [Python, FastAPI, SQLAlchemy, Alembic, Pytest, Claude API, React, TypeScript, Docker]
repoName: financas-ia
cover: ../covers/financas-ia.png
coverAlt: Painel do mês com gastos por categoria e a comparação de gastos e entradas dos últimos seis meses
order: 2
---

## Problema

Controlar gastos em planilha dá trabalho, e quase todo mundo desiste no segundo mês. A parte chata é classificar cada linha do extrato, ainda mais com descrições como `MP *LOJADOZE` ou `DROGARIAPACHECO`.

## Solução

A importação passa por um pipeline em camadas, e cada transação guarda qual camada decidiu:

1. **Regras do usuário**: criadas a partir das correções dele.
2. **Regras padrão**: palavras-chave de lojas e termos brasileiros (iFood, Uber, Pix, supermercado, farmácia...).
3. **IA**: o que sobrou vai para o Claude **numa única requisição**, com resposta em JSON schema e lista fechada de categorias.
4. **A revisar**: resposta inválida, confiança abaixo de 0,7, erro de rede ou IA desligada.

Na tela de revisão, ao corrigir uma categoria, o app sugere uma regra e mostra quantas transações parecidas ela cobre. O painel mostra gastos por categoria e os últimos seis meses.

Também lê OFX de banco brasileiro (SGML com tags abertas, em Latin-1), CSV do Nubank e CSV genérico, com detecção automática do formato. Reimportar o mesmo extrato não duplica nada.

## Quanto as regras acertam

Medi o pipeline só com regras num conjunto de 102 transações fictícias rotuladas à mão, um quarto delas com descrições difíceis de propósito:

| Métrica | Resultado |
| --- | --- |
| Cobertura (receberam categoria) | 78,4% |
| Acerto nas que receberam categoria | 97,5% |
| Acerto geral (contando "a revisar" como erro) | 76,5% |

Os números tendem a ser otimistas, porque a mesma pessoa escreveu as regras e o conjunto de teste. Os 22% que sobram são justamente o trabalho da IA. O mesmo script mede regras + IA quando há uma chave da API configurada.

## IA com responsabilidade

- **Custo previsível:** a IA só vê o que as regras não resolvem, e tudo vai numa chamada. A estimativa é de menos de US$ 0,001 por extrato com o Claude Haiku.
- **Nunca inventa categoria:** a resposta é validada item por item com Pydantic. Um item ruim vai para revisão sem derrubar o lote.
- **Privacidade:** só id, descrição e valor de cada transação saem do servidor.
- **Contra prompt injection:** o prompt trata as descrições como dados do extrato, nunca como instruções.
- **Funciona sem chave:** sem a chave da API, o app roda só com regras e avisa na tela.

## Decisões técnicas

| Decisão | Alternativa | Por quê |
| --- | --- | --- |
| IA só no que as regras não resolvem | Mandar tudo para a IA | Custo e previsibilidade: 78% já se resolve sem IA. |
| Classificador atrás de um `Protocol`, com um falso nos testes | Chamar a API nos testes | Testes rápidos, determinísticos e de graça. |
| Valores em centavos inteiros | `float` ou `Decimal` | Sem erro de arredondamento, mesmo tipo no SQLite e no Postgres. |
| Token opaco salvo só como hash | JWT | O logout revoga de verdade e não há segredo de assinatura para vazar. |
| Parser OFX próprio | `ofxparse` ou `ofxtools` | OFX de banco brasileiro costuma vir em SGML com tags abertas. |
| SQLite local, Postgres em produção | Postgres em todo lugar | Quem clona roda sem instalar banco; um teste garante que as migrations batem com os modelos. |

## Qualidade

- 92 testes com pytest e 96% de cobertura: parsers, cada camada do pipeline, validação da resposta da IA, rotas da API e isolamento entre usuários.
- ruff e mypy em modo estrito sem nenhum aviso.
- Front-end em React com TypeScript estrito e testes com Vitest, tudo rodando no GitHub Actions.

## Próximos passos

- Medir regras + IA num extrato real e publicar os números.
- Filtro por conta na revisão e edição de regras.
- Limite de tentativas no login.
- Testes contra Postgres e de ponta a ponta no CI.
