# Portfólio

Portfólio de dev full-stack em português e inglês, feito com [Astro](https://astro.build). O site é estático, carrega rápido, tem tema claro e escuro e é publicado automaticamente no GitHub Pages.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm install` | Instala as dependências |
| `npm run dev` | Abre o site em `http://localhost:4321` com recarga automática |
| `npm run check` | Confere os tipos e o conteúdo dos projetos |
| `npm run build` | Checa e gera o site final em `dist/` |
| `npm run preview` | Mostra localmente o site gerado pelo build |

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Nome, e-mail, links, bio, "Agora", ferramentas | `src/data/profile.ts` |
| Textos fixos da interface (PT e EN) | `src/i18n/ui.ts` |
| Projetos | `src/content/projects/pt/*.md` e `src/content/projects/en/*.md` |
| Cores, fontes e espaçamentos | `src/styles/global.css` (variáveis no `:root`) |
| Endereço do site | `astro.config.mjs` (`site` e `base`) |

## Adicionar um projeto

1. Crie `src/content/projects/pt/nome-do-projeto.md` e `src/content/projects/en/nome-do-projeto.md`, com o mesmo nome de arquivo.
2. Preencha o cabeçalho, copiando um projeto existente como modelo:

   ```yaml
   ---
   title: Nome do projeto
   summary: Uma frase dizendo o que faz e para quem.
   year: 2026
   status: done # done | in-progress | planned
   role: Full-stack
   stack: [TypeScript, Next.js, PostgreSQL]
   demo: https://link-da-demo.com # opcional, só quando estiver no ar
   repoName: nome-do-projeto # vira https://github.com/GabrielBaldi/nome-do-projeto
   cover: ../covers/nome-do-projeto.png # opcional, caminho relativo ao .md
   coverAlt: Tela inicial mostrando a agenda do dia
   order: 1 # menor aparece primeiro
   draft: false # true = só aparece no npm run dev
   ---
   ```

3. Escreva o estudo de caso em Markdown, com as seções Problema, Solução, Decisões técnicas e O que aprendi.

Se faltar um campo obrigatório ou um link estiver mal escrito, o `npm run check` mostra o erro.

## Publicar no GitHub Pages

O site fica no repositório `GabrielBaldi.github.io` e é publicado em **https://gabrielbaldi.github.io**.

1. No GitHub, o repositório **público** `GabrielBaldi.github.io` recebe o código (`git push -u origin main`).
2. Em **Settings → Pages**, a opção **Source** fica em **GitHub Actions**.
3. A aba **Actions** mostra o workflow `.github/workflows/deploy.yml`. Quando ele termina, o site está no ar.

A partir daí, cada `git push` na `main` publica o site de novo.

## Estrutura

```text
src/
├── components/   # Seções da página (Hero, ProjectList, Stack, About, Contact...)
├── content/
│   └── projects/ # Um .md por projeto e idioma
├── data/         # profile.ts: seus dados
├── i18n/         # Textos da interface e rotas por idioma
├── layouts/      # Base.astro: <head>, SEO, header e footer
├── lib/          # Busca e ordenação dos projetos
├── pages/        # Rotas: / (PT), /en/ (EN), /projetos/[slug], /en/projects/[slug]
└── styles/       # global.css: tokens de design
docs/
└── projetos-recomendados.md  # Pesquisa: que projetos construir e como apresentar
```
