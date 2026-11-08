---
title: This portfolio
summary: A bilingual static site built with Astro, with projects written in Markdown, light and dark themes and automatic deploys to GitHub Pages.
year: 2026
status: done
role: Design and development
stack: [Astro, TypeScript, CSS, Markdown, GitHub Actions]
repoName: GabrielBaldi.github.io
order: 90
---

## Problem

Recruiters spend a few minutes on each portfolio. The site had to load fast on a phone, show the projects right away and work in Portuguese and English, without turning into a system that is hard to maintain.

## Solution

- **Astro outputs static HTML.** No JavaScript framework ships to the browser. The only script is the copy-email button.
- **Each project is a Markdown file** validated by a schema (Zod). Adding a project means creating two files, one per language.
- **One folder per language:** `/` in Portuguese and `/en/` in English, with `hreflang` for search engines.
- **Light and dark themes** that follow the system, with colors in CSS variables and contrast checked against WCAG AA.
- **Self-hosted fonts**, with no external CDN.
- **Automatic deploys:** every push to `main` runs type checks, builds and publishes to GitHub Pages.

## Technical decisions

| Decision | Alternative | Why |
| --- | --- | --- |
| Astro | Next.js | A content site needs neither a server nor React on the client. |
| CSS with tokens | Tailwind | There are few screens, and CSS variables keep the dark theme simple. |
| GitHub Pages | Vercel | It is free and lives next to the code and the GitHub profile. |

## Next steps

- Generate a share image (Open Graph) for each project.
- Run Lighthouse in CI on every deploy.
- Add a section of short write-ups about what I learned in each project.
