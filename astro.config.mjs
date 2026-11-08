// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Publicado no repositório GabrielBaldi.github.io, por isso base: '/'.
// Se um dia ele mudar para outro nome (ex.: "portfolio"), use base: '/portfolio'.
export default defineConfig({
  site: 'https://gabrielbaldi.github.io',
  base: '/',
  // Astro 7 mudou o padrão para 'jsx'; `true` mantém os espaços entre elementos inline.
  compressHTML: true,
  // Blocos de código com um tema claro e um escuro; as cores trocam via CSS em global.css.
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: true,
    },
  },
  integrations: [sitemap()],
});
