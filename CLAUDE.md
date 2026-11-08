@AGENTS.md

# Portfólio (Astro 7, PT/EN)

Site estático publicado no GitHub Pages via `.github/workflows/deploy.yml`. Converse com o usuário em português (pt-BR).

## Comandos
- Dev: `npm run dev` (porta 4321)
- Checagem: `npm run check` (astro check)
- Build: `npm run build` (roda check + build)

## Convenções
- Dados pessoais só em `src/data/profile.ts`; textos de interface só em `src/i18n/ui.ts` (as chaves de PT e EN precisam bater).
- Todo projeto existe nos dois idiomas com o mesmo nome de arquivo: `src/content/projects/{pt,en}/<slug>.md`.
- `draft: true` aparece só em dev; o build de produção esconde.
- Links internos sempre pelos helpers de `src/i18n/routes.ts` (respeitam o `base` do GitHub Pages) e terminando em `/`.
- CSS: use as variáveis de `:root` em `src/styles/global.css`; não crie cores soltas. Tema escuro via `prefers-color-scheme`.
- Astro 7: `compressHTML: true` está ligado de propósito; o compilador acusa erro em tag não fechada.

## Contexto
- Os projetos do portfólio têm código próprio, cada um no seu repositório em `C:\Users\Administrator\Desktop\projetos\` (agenda-facil, financas-ia, painel-economico). As capas em `src/content/projects/covers/` são cópias de `docs/screenshot.png` de cada um. Pesquisa e roteiro em `docs/projetos-recomendados.md`.
- Dono: Gabriel Baldi (GitHub `GabrielBaldi`). O site é publicado no repositório `GabrielBaldi.github.io` em https://gabrielbaldi.github.io.
- As demos dos projetos ainda não estão no ar, por decisão do usuário: não faça deploy delas sem ele pedir, e não escreva textos que prometam demo online.
