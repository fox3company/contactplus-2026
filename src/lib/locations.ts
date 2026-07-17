export interface ProgramLocation {
  name: string;
  address?: string;
  href: string;
}

export const locations: Record<string, ProgramLocation> = {
  'artcor-creative-hub': {
    name: 'Artcor',
    address: '31 August 1989 St 137, Chișinău',
    href: 'https://share.google/fBRQE6NZZYeCE9Mr4',
  },
  'national-choreography-college': {
    name: 'National Choreography College',
    address: 'Mihai Eminescu Street 31, Chișinău',
    href: 'https://share.google/zf83FcBnb8eVAUbna',
  },
  'nod-space': {
    name: 'NOD Space',
    address: 'Bulevardul Ștefan cel Mare și Sfînt Street 134, Chișinău',
    href: 'https://share.google/q23sJIUsxiCYEWKlh',
  },
  'great-national-assembly-square': {
    name: 'The Great National Assembly Square',
    address: 'Stefan cel Mare si Sfant Boulevard, Chișinău, Moldova',
    href: 'https://maps.app.goo.gl/kYK425DJdp7onLR16',
  },
  'iusty-art-gallery': {
    name: 'Iusty Art Gallery',
    address: 'Bogdan P.Hasdeu Street 3, Chișinău',
    href: 'https://share.google/4BcxAfXfOnM2rHUcU',
  },
  'ginta-latina': {
    name: 'Ginta Latină Culture and Arts Centre',
    address: 'Sfatul Țării Street 18, Chișinău',
    href: 'https://share.google/JXJYnUIymEAh4lIEC',
  },
  'art-studio-21': {
    name: 'Art Studio 21',
    address: 'Alexei Mateevici St 84, Chișinău, Moldova',
    href: 'https://maps.app.goo.gl/yiKnbrjbsrjRPVPf6',
  },
};
