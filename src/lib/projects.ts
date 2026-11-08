import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { profile } from '../data/profile';

export type Project = CollectionEntry<'projects'>;

/** "pt/agenda-facil" -> "agenda-facil" */
export function slugOf(entry: Project): string {
  return entry.id.split('/').slice(1).join('/');
}

/** Link do repositório: `repo` completo ou `repoName` no GitHub do perfil. */
export function repoUrl(entry: Project): string | undefined {
  const { repo, repoName } = entry.data;
  return repo ?? (repoName ? `${profile.github}/${repoName}` : undefined);
}

/** Projetos de um idioma, em ordem. Rascunhos aparecem só em desenvolvimento. */
export async function getProjects(lang: Lang): Promise<Project[]> {
  const entries = await getCollection(
    'projects',
    ({ id, data }) => id.startsWith(`${lang}/`) && (import.meta.env.DEV || !data.draft),
  );
  return entries.sort((a, b) => a.data.order - b.data.order);
}
