---
title: Painel Econômico
summary: Selic, inflação, dólar e desemprego num só painel, com dados abertos do Banco Central e do IBGE. Uma API em Go faz cache e normaliza as séries, e cada gráfico pode ser compartilhado por link.
year: 2026
status: done
role: Full-stack
stack: [Go, React, TypeScript, Vite, SVG, Vitest, GitHub Actions, Docker]
repoName: painel-economico
cover: ../covers/painel-economico.png
coverAlt: Painel comparando a taxa Selic com o IPCA acumulado em 12 meses nos últimos 10 anos
order: 3
---

## Problema

Os dados econômicos do Brasil são públicos, mas difíceis de usar. A Selic é a série 432 do SGS, o dólar é a série 1 e o desemprego está na tabela 6381 do SIDRA, com períodos em trimestres móveis. Cada API tem formato e limites próprios, e as duas às vezes ficam lentas ou fora do ar. Quem só quer ver como a inflação andou perto dos juros acaba desistindo.

## Solução

- **Uma API em Go** junta as duas fontes num formato único (`{date, value}`), com cache em memória, tentativas com backoff exponencial e jitter, e deduplicação de buscas simultâneas (singleflight).
- **Se a fonte cair**, a API devolve a última cópia boa com `stale: true`, e a tela avisa de quando é o dado, em vez de mostrar erro.
- **Comparação de dois indicadores:** quando os dois têm a mesma unidade, dividem o mesmo eixo; quando não têm, cada um ganha seu painel, empilhados sobre o mesmo eixo de tempo.
- **Todo o estado fica na URL**, então qualquer gráfico vira um link para compartilhar.
- **Acessível:** o gráfico é navegável por teclado, com cada ponto lido em voz alta, e há uma visão em tabela com os mesmos dados.
- **Um binário só:** o front-end em React é embutido no servidor Go com `embed`.

## O que encontrei nas APIs

Testar as fontes antes de codar mudou o projeto:

- O SGS **recusa mais de 10 anos** de consulta em séries diárias (responde `406`). A API divide o período em janelas de 10 anos e busca todas em paralelo.
- Um intervalo sem dados volta como `404`, que a API trata como lista vazia.
- A série da Selic já traz **datas futuras** (a meta vale até a próxima reunião do Copom), então a busca para em hoje.
- No SIDRA, valores ausentes chegam como símbolos (`-`, `..`, `X`) e são ignorados.

## Decisões técnicas

| Decisão | Alternativa | Por quê |
| --- | --- | --- |
| Painéis empilhados para unidades diferentes | Dois eixos Y ou índice base 100 | Dois eixos criam cruzamentos que não existem. Base 100 não faz sentido para taxas, e 4 dos 5 indicadores são taxas. |
| Cache do histórico inteiro, recortado a cada pedido | Uma entrada por período | São só 5 chaves, e cada série vai à fonte no máximo uma vez por hora. |
| Cache em memória atrás de uma interface | Redis desde o início | Com uma instância só, Redis seria mais um serviço sem ganho. A interface já permite a troca. |
| Série oficial do IPCA em 12 meses (SGS 13522) | Calcular a partir do IPCA mensal | Multiplicar as taxas mensais arredondadas dá 4,576%, contra 4,58% oficiais. |
| Gráfico em SVG feito à mão | uPlot ou Recharts | Controle total da acessibilidade e do tema, sem dependência de gráfico. |
| `net/http` da biblioteca padrão | Gin ou Echo | São três rotas; desde o Go 1.22 o roteador padrão entende métodos e parâmetros. |

## Qualidade

- 94 casos de teste em Go, com servidores falsos (`httptest`) no lugar do BCB e do IBGE: parsers, janelas de 10 anos, retry, cache, dado desatualizado e rotas.
- 83 testes com Vitest no front-end: estado na URL, transformações de dados e geometria do gráfico.
- gofmt, go vet, staticcheck, ESLint estrito com regras de acessibilidade e Prettier, todos rodando no GitHub Actions.

## Próximos passos

- Redis, quando houver mais de uma instância.
- Responder com a cópia expirada e atualizar em segundo plano (stale-while-revalidate).
- Mais indicadores: IGP-M, CDI e juro real.
- Testes de ponta a ponta com Playwright no CI.
