---
title: Este portfólio
summary: Site estático bilíngue feito com Astro, com projetos em Markdown, tema claro e escuro e deploy automático no GitHub Pages.
year: 2026
status: done
role: Design e desenvolvimento
stack: [Astro, TypeScript, CSS, Markdown, GitHub Actions]
repoName: GabrielBaldi.github.io
order: 90
---

## Problema

Recrutadores passam poucos minutos em cada portfólio. O site precisava abrir rápido no celular, mostrar os projetos logo no começo e funcionar em português e inglês, sem virar um sistema difícil de manter.

## Solução

- **Astro gera HTML estático.** Nenhum framework JavaScript vai para o navegador. O único script é o botão de copiar e-mail.
- **Cada projeto é um arquivo Markdown** validado por um schema (Zod). Para adicionar um projeto, basta criar dois arquivos, um por idioma.
- **Dois idiomas por pasta:** `/` em português e `/en/` em inglês, com `hreflang` para os buscadores.
- **Tema claro e escuro** seguindo o sistema, com as cores em variáveis CSS e contraste conferido no nível AA da WCAG.
- **Fontes servidas pelo próprio site**, sem depender de CDN externa.
- **Deploy automático:** cada push na `main` roda a checagem de tipos, o build e publica no GitHub Pages.

## Decisões técnicas

| Decisão | Alternativa | Por quê |
| --- | --- | --- |
| Astro | Next.js | Um site de conteúdo não precisa de servidor nem de React no cliente. |
| CSS com tokens | Tailwind | São poucas telas, e variáveis CSS deixam o tema escuro simples. |
| GitHub Pages | Vercel | É grátis e fica junto do código e do perfil no GitHub. |

## Próximos passos

- Gerar uma imagem de compartilhamento (Open Graph) para cada projeto.
- Rodar o Lighthouse no CI a cada deploy.
- Adicionar uma seção de artigos curtos sobre o que aprendi em cada projeto.
