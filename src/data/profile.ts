import type { Lang } from '../i18n/ui';

type Localized = Record<Lang, string>;
type LocalizedList = Record<Lang, string[]>;

/** Usuário do GitHub. Os links dos repositórios dos projetos são montados a partir dele. */
const githubUser = 'GabrielBaldi';

/** Seus dados pessoais ficam todos aqui. */
export const profile = {
  name: 'Gabriel Baldi',
  initials: 'GB',
  email: 'baldigabriel135@gmail.com',
  githubUser,
  github: `https://github.com/${githubUser}`,
  linkedin: 'https://www.linkedin.com/in/gabriel-baldi-111959293/',
  /** Opcional: coloque o PDF em public/ e escreva '/curriculo.pdf'. Vazio esconde o link. */
  cv: '',

  role: { pt: 'Dev Full-Stack', en: 'Full-Stack Developer' } satisfies Localized,
  location: { pt: 'Brasil · aberto a remoto', en: 'Brazil · open to remote' } satisfies Localized,
  status: { pt: 'Disponível para novas oportunidades', en: 'Open to new opportunities' } satisfies Localized,
  mainStack: ['TypeScript', 'Python', 'Go', 'PostgreSQL'],

  headline: {
    pt: 'Construo aplicações web de ponta a ponta: interface, API, banco de dados e deploy. Gosto de código testado e de produto que alguém usa de verdade.',
    en: 'I build web applications end to end: interface, API, database and deploy. I care about tested code and products people actually use.',
  } satisfies Localized,

  // Dica: conte aqui a sua história (como começou, formação, o que procura).
  about: {
    pt: [
      'Sou dev full-stack e gosto de construir produtos do começo ao fim: entender o problema, desenhar a solução, escrever o código, testar e colocar no ar.',
      'Aqui cada projeto tem código aberto, testes automatizados e um estudo de caso com as decisões técnicas e o que ainda quero melhorar.',
    ],
    en: [
      "I'm a full-stack developer who likes building products from start to finish: understanding the problem, designing the solution, writing the code, testing it and shipping it.",
      'Every project here has open source code, automated tests and a case study with the technical decisions and what I still want to improve.',
    ],
  } satisfies LocalizedList,

  // Atualize de vez em quando: mostra que o site está vivo.
  now: {
    pt: [
      'Evoluindo os projetos deste portfólio e preparando as demos online',
      'Praticando testes automatizados e CI em todos eles',
      'Procurando minha próxima oportunidade como dev',
    ],
    en: [
      'Improving the projects in this portfolio and preparing their live demos',
      'Practicing automated tests and CI in every one of them',
      'Looking for my next role as a developer',
    ],
  } satisfies LocalizedList,

  // O que os projetos do portfólio usam. Ajuste se quiser incluir outras ferramentas que você domina.
  stack: [
    { label: { pt: 'Linguagens', en: 'Languages' }, items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'] },
    { label: { pt: 'Front-end', en: 'Front-end' }, items: ['React', 'Next.js', 'Astro', 'Vite', 'HTML & CSS'] },
    { label: { pt: 'Back-end', en: 'Back-end' }, items: ['Node.js', 'FastAPI', 'Go net/http', 'REST & OpenAPI'] },
    { label: { pt: 'Dados', en: 'Data' }, items: ['PostgreSQL', 'Drizzle ORM', 'SQLAlchemy', 'SQLite'] },
    { label: { pt: 'Qualidade e DevOps', en: 'Quality & DevOps' }, items: ['Vitest', 'Pytest', 'Playwright', 'Docker', 'GitHub Actions'] },
    { label: { pt: 'IA aplicada', en: 'Applied AI' }, items: ['Claude API', 'Structured output', 'Evals'] },
  ] satisfies { label: Localized; items: string[] }[],
};
