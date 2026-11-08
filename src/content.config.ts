import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Cada projeto tem um arquivo por idioma, com o mesmo nome:
 *   src/content/projects/pt/meu-projeto.md
 *   src/content/projects/en/meu-projeto.md
 * Projetos com `draft: true` só aparecem no `npm run dev`.
 */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.number().int(),
      status: z.enum(['done', 'in-progress', 'planned']),
      role: z.string().optional(),
      stack: z.array(z.string()).min(1),
      demo: z.url().optional(),
      /** Link completo do repositório. */
      repo: z.url().optional(),
      /** Ou só o nome do repositório no seu GitHub (o link é montado com profile.githubUser). */
      repoName: z.string().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      order: z.number().default(99),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
