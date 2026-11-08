export const languages = { pt: 'Português', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'pt';

export const htmlLang: Record<Lang, string> = { pt: 'pt-BR', en: 'en' };

const pt = {
  'meta.description': 'Portfólio de {name}, dev full-stack. Projetos com código aberto, testes e estudo de caso.',
  skip: 'Pular para o conteúdo',
  'nav.label': 'Seções',
  'nav.home': 'início',
  'nav.projects': 'Projetos',
  'nav.stack': 'Stack',
  'nav.about': 'Sobre',
  'nav.contact': 'Contato',
  'nav.switchLabel': 'Read in English',
  'hero.cta.projects': 'Ver projetos',
  'hero.cta.contact': 'Falar comigo',
  'spec.label': 'Resumo',
  'spec.role': 'Função',
  'spec.base': 'Base',
  'spec.stack': 'Stack',
  'spec.links': 'Links',
  'projects.title': 'Projetos selecionados',
  'projects.lead': 'Cada projeto tem código aberto, testes automatizados e um estudo de caso explicando as decisões técnicas.',
  'projects.empty': 'Os primeiros projetos estão em construção. Volte em breve.',
  'project.demo': 'Ver demo',
  'project.repo': 'Código',
  'project.case': 'Estudo de caso',
  'project.back': 'Voltar aos projetos',
  'project.year': 'Ano',
  'project.status': 'Status',
  'project.role': 'Papel',
  'project.stack': 'Stack',
  'project.draft': 'Rascunho: só aparece no modo de desenvolvimento',
  'project.next': 'Próximo projeto',
  'status.done': 'Concluído',
  'status.in-progress': 'Em andamento',
  'status.planned': 'Planejado',
  'stack.title': 'Ferramentas',
  'stack.lead': 'O que eu uso para levar um projeto da ideia até produção.',
  'about.title': 'Sobre',
  'about.now': 'Agora',
  'contact.title': 'Vamos conversar',
  'contact.lead': 'Aberto a vagas full-stack, back-end ou front-end, no Brasil ou remotas.',
  'contact.copy': 'Copiar e-mail',
  'contact.copied': 'E-mail copiado',
  'contact.cv': 'Currículo (PDF)',
  'footer.built': 'Feito com Astro',
  'footer.top': 'Voltar ao topo',
  '404.title': 'Página não encontrada',
  '404.text': 'O endereço pode ter mudado ou nunca ter existido.',
  '404.back': 'Ir para o início',
} as const;

export type UIKey = keyof typeof pt;

const en: Record<UIKey, string> = {
  'meta.description': 'Portfolio of {name}, full-stack developer. Projects with open source code, tests and case studies.',
  skip: 'Skip to content',
  'nav.label': 'Sections',
  'nav.home': 'home',
  'nav.projects': 'Work',
  'nav.stack': 'Stack',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.switchLabel': 'Ler em português',
  'hero.cta.projects': 'See projects',
  'hero.cta.contact': 'Get in touch',
  'spec.label': 'Summary',
  'spec.role': 'Role',
  'spec.base': 'Based in',
  'spec.stack': 'Stack',
  'spec.links': 'Links',
  'projects.title': 'Selected work',
  'projects.lead': 'Every project has open source code, automated tests and a case study explaining the technical decisions.',
  'projects.empty': 'The first projects are being built. Check back soon.',
  'project.demo': 'Live demo',
  'project.repo': 'Code',
  'project.case': 'Case study',
  'project.back': 'Back to projects',
  'project.year': 'Year',
  'project.status': 'Status',
  'project.role': 'Role',
  'project.stack': 'Stack',
  'project.draft': 'Draft: only visible in development mode',
  'project.next': 'Next project',
  'status.done': 'Shipped',
  'status.in-progress': 'In progress',
  'status.planned': 'Planned',
  'stack.title': 'Toolbox',
  'stack.lead': 'What I use to take a project from idea to production.',
  'about.title': 'About',
  'about.now': 'Now',
  'contact.title': "Let's talk",
  'contact.lead': 'Open to full-stack, back-end or front-end roles, remote or in Brazil.',
  'contact.copy': 'Copy email',
  'contact.copied': 'Email copied',
  'contact.cv': 'Résumé (PDF)',
  'footer.built': 'Built with Astro',
  'footer.top': 'Back to top',
  '404.title': 'Page not found',
  '404.text': 'The address may have changed or never existed.',
  '404.back': 'Go to the home page',
};

const ui: Record<Lang, Record<UIKey, string>> = { pt, en };

export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'pt' ? 'en' : 'pt';
}
