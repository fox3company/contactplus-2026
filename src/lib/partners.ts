import type { Locale } from './locales';

type LocalizedText = Record<Locale, string>;

type Partner = {
  name: LocalizedText;
  role: LocalizedText;
  src: string;
  className: string;
  href: string;
};

export const partnersCopy: Record<Locale, {
  title: string;
  lead: string;
  supportTitle: string;
  partnersTitle: string;
  visitSite: string;
}> = {
  en: {
    title: 'Partners',
    lead: 'Contact+ is made possible through the support of cultural institutions and the organisations, spaces and local brands that help the festival take shape in Chișinău.',
    supportTitle: 'With the support of',
    partnersTitle: 'Festival partners',
    visitSite: 'Visit website',
  },
  ro: {
    title: 'Parteneri',
    lead: 'Contact+ este posibil datorită sprijinului instituțiilor culturale și organizațiilor, spațiilor și brandurilor locale care ajută festivalul să prindă formă la Chișinău.',
    supportTitle: 'Cu sprijinul',
    partnersTitle: 'Partenerii festivalului',
    visitSite: 'Vizitează site-ul',
  },
  ru: {
    title: 'Партнёры',
    lead: 'Contact+ становится возможным благодаря поддержке культурных институций, организаций, площадок и локальных брендов, которые помогают фестивалю обрести форму в Кишинёве.',
    supportTitle: 'При поддержке',
    partnersTitle: 'Партнёры фестиваля',
    visitSite: 'Открыть сайт',
  },
};

export const partnerLogos: { support: Partner[]; partners: Partner[] } = {
  support: [
    {
      name: {
        en: 'Ministry of Culture of RM',
        ro: 'Ministerul Culturii al Republicii Moldova',
        ru: 'Министерство культуры Республики Молдова',
      },
      role: { en: 'Institutional support', ro: 'Sprijin instituțional', ru: 'Институциональная поддержка' },
      src: '/media/partners/ministry-of-culture.png',
      className: 'partner-card--ministry',
      href: 'https://mc.gov.md/',
    },
    {
      name: { en: 'Moldindconbank', ro: 'Moldindconbank', ru: 'Moldindconbank' },
      role: { en: 'Financial partner', ro: 'Partener financiar', ru: 'Финансовый партнёр' },
      src: '/media/partners/moldindconbank.png',
      className: 'partner-card--bank',
      href: 'https://micb.md/en/',
    },
  ],
  partners: [
    {
      name: { en: 'NOD Space', ro: 'NOD Space', ru: 'NOD Space' },
      role: { en: 'Cultural venue in Chișinău', ro: 'Spațiu cultural în Chișinău', ru: 'Культурная площадка в Кишинёве' },
      src: '/media/partners/nod-space.svg',
      className: 'partner-card--nod',
      href: 'https://nodspace.md/',
    },
    {
      name: { en: 'Artcor', ro: 'Artcor', ru: 'Artcor' },
      role: { en: 'Creative industries hub', ro: 'Hub al industriilor creative', ru: 'Хаб креативных индустрий' },
      src: '/media/partners/artcor.svg',
      className: 'partner-card--artcor',
      href: 'https://www.artcor.md/',
    },
    {
      name: { en: 'OM', ro: 'OM', ru: 'OM' },
      role: { en: 'Moldovan drinking-water brand', ro: 'Brand moldovenesc de apă potabilă', ru: 'Молдавский бренд питьевой воды' },
      src: '/media/partners/om-transparent.png',
      className: 'partner-card--om',
      href: 'https://om.md/',
    },
    {
      name: { en: 'Letto', ro: 'Letto', ru: 'Letto' },
      role: { en: 'Moldovan soft-drinks brand', ro: 'Brand moldovenesc de băuturi răcoritoare', ru: 'Молдавский бренд безалкогольных напитков' },
      src: '/media/partners/letto.png',
      className: 'partner-card--letto',
      href: 'https://letto.md/',
    },
  ],
};
