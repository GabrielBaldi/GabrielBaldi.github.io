import type { Lang } from './ui';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixa o caminho com o `base` do astro.config (necessário no GitHub Pages de repositório). */
export function withBase(path: string): string {
  return `${base}${path}`;
}

export function homePath(lang: Lang): string {
  return withBase(lang === 'pt' ? '/' : '/en/');
}

export function projectPath(lang: Lang, slug: string): string {
  return withBase(lang === 'pt' ? `/projetos/${slug}/` : `/en/projects/${slug}/`);
}

export function sectionPath(lang: Lang, id: string): string {
  return `${homePath(lang)}#${id}`;
}
