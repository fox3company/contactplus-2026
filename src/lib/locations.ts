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
  'chisinau-city-centre': {
    name: 'Chișinău city centre',
    href: 'https://www.google.com/maps/search/?api=1&query=Chi%C8%99in%C4%83u%20city%20centre',
  },
  'ginta-latina': {
    name: 'Ginta Latină Culture and Arts Centre',
    address: 'Sfatul Țării Street 18, Chișinău',
    href: 'https://share.google/JXJYnUIymEAh4lIEC',
  },
  'festival-studio': {
    name: 'Festival Studio',
    address: 'Near Sfatul Țării Street 18, Chișinău',
    href: 'https://www.google.com/maps/search/?api=1&query=47.027678,28.825360',
  },
  'art-studio-21': {
    name: 'Art Studio 21',
    address: 'Alexei Mateevici St 84, Chișinău, Moldova',
    href: 'https://maps.app.goo.gl/yiKnbrjbsrjRPVPf6',
  },
};
