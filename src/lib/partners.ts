import type { Locale } from './locales';

export const partnersCopy: Record<Locale, {
  title: string;
  lead: string;
  supportTitle: string;
  partnersTitle: string;
  closingTitle: string;
  closingText: string;
}> = {
  en: {
    title: 'Partners',
    lead: 'Contact+ is made possible through the support of cultural institutions and the partners who help the festival take shape in Chișinău.',
    supportTitle: 'With the support of',
    partnersTitle: 'Partners',
    closingTitle: 'A shared festival takes a shared effort',
    closingText: 'From public support to spaces, production and local knowledge, each collaboration helps connect international artists, local audiences and the movement community.',
  },
  ro: {
    title: 'Parteneri',
    lead: 'Contact+ este posibil datorită sprijinului instituțiilor culturale și partenerilor care ajută festivalul să prindă formă la Chișinău.',
    supportTitle: 'Cu sprijinul',
    partnersTitle: 'Parteneri',
    closingTitle: 'Un festival comun se construiește împreună',
    closingText: 'De la sprijin public la spații, producție și cunoaștere locală, fiecare colaborare apropie artiști internaționali, publicul local și comunitatea de mișcare.',
  },
  ru: {
    title: 'Партнёры',
    lead: 'Contact+ становится возможным благодаря поддержке культурных институций и партнёров, которые помогают фестивалю обрести форму в Кишинёве.',
    supportTitle: 'При поддержке',
    partnersTitle: 'Партнёры',
    closingTitle: 'Общий фестиваль создаётся вместе',
    closingText: 'От государственной поддержки до площадок, производства и локального знания — каждое сотрудничество соединяет международных артистов, местную публику и сообщество движения.',
  },
};

export const partnerLogos = {
  support: [
    { name: 'Ministry of Culture of the Republic of Moldova', src: '/media/partners/ministry-of-culture.png', className: 'partner-logo--ministry' },
    { name: 'Moldindconbank', src: '/media/partners/moldindconbank.png', className: 'partner-logo--bank' },
  ],
  partners: [
    { name: 'NOD Space', src: '/media/partners/nod-space.svg', className: 'partner-logo--nod' },
    { name: 'Artcor', src: '/media/partners/artcor.svg', className: 'partner-logo--artcor' },
    { name: 'OM', src: '/media/partners/om.png', className: 'partner-logo--om' },
    { name: 'Letto', src: '/media/partners/letto.png', className: 'partner-logo--letto' },
  ],
};
