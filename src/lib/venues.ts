import type { Locale } from './locales';

export const festivalMapUrl = 'https://maps.app.goo.gl/VYSFo9W7TMN5Mctu5';

export interface VenueDetails {
  coordinates: [number, number];
  description: Record<Locale, string>;
}

export const venueDetails: Record<string, VenueDetails> = {
  'artcor-creative-hub': {
    coordinates: [47.0269734, 28.8223128],
    description: {
      en: 'A creative hub in the historic centre, hosting festival gatherings and practice sessions.',
      ro: 'Un hub creativ în centrul istoric, care găzduiește întâlniri și sesiuni de practică ale festivalului.',
      ru: 'Креативный хаб в историческом центре, где проходят встречи и практики фестиваля.',
    },
  },
  'national-choreography-college': {
    coordinates: [47.0191062, 28.8322478],
    description: {
      en: 'A dance-education venue with studio space for the festival’s intensive practice program.',
      ro: 'O locație de educație coregrafică, cu spații de studio pentru programul intensiv de practică al festivalului.',
      ru: 'Учебное хореографическое пространство со студиями для интенсивной практической программы фестиваля.',
    },
  },
  'nod-space': {
    coordinates: [47.0233115, 28.8350163],
    description: {
      en: 'An independent cultural space in central Chișinău, welcoming performances and shared festival moments.',
      ro: 'Un spațiu cultural independent din centrul Chișinăului, care primește performance-uri și momente comune ale festivalului.',
      ru: 'Независимое культурное пространство в центре Кишинёва для перформансов и общих событий фестиваля.',
    },
  },
  'ginta-latina': {
    coordinates: [47.0267285, 28.8249940],
    description: {
      en: 'A long-standing cultural centre near the city centre, hosting the festival’s evening performance program.',
      ro: 'Un centru cultural de tradiție, aproape de centrul orașului, care găzduiește programul de performance-uri de seară al festivalului.',
      ru: 'Культурный центр недалеко от городского центра, где проходит вечерняя перформанс-программа фестиваля.',
    },
  },
  'festival-studio': {
    coordinates: [47.027678, 28.825360],
    description: {
      en: 'A festival practice space next to Ginta Latină, hosting daytime classes and laboratories.',
      ro: 'Un spațiu de practică al festivalului, lângă Ginta Latină, care găzduiește clase și laboratoare de zi.',
      ru: 'Пространство фестивальной практики рядом с Ginta Latină, где проходят дневные классы и лаборатории.',
    },
  },
  'art-studio-21': {
    coordinates: [47.0230811, 28.8181392],
    description: {
      en: 'A studio setting for focused practice, close to the university quarter.',
      ro: 'Un spațiu de studio pentru practică concentrată, aproape de cartierul universitar.',
      ru: 'Студийное пространство для сосредоточенной практики рядом с университетским кварталом.',
    },
  },
  'great-national-assembly-square': {
    coordinates: [47.0245039, 28.8321376],
    description: {
      en: 'Chișinău’s central public square, bringing part of Contact+ into the shared urban space.',
      ro: 'Piața publică centrală a Chișinăului, care aduce o parte din Contact+ în spațiul urban comun.',
      ru: 'Главная городская площадь Кишинёва, где часть Contact+ выходит в общее городское пространство.',
    },
  },
};

export const venuesCopy: Record<Locale, {
  title: string;
  lead: string;
  mapTitle: string;
  mapText: string;
  mapAction: string;
  mapFallback: string;
  mapDetailAction: string;
  listTitle: string;
  listText: string;
  orderNote: string;
  firstActivity: string;
  addressLabel: string;
  directionsAction: string;
  programLabel: string;
  moreProgram: (count: number) => string;
  scheduleAction: string;
}> = {
  en: {
    title: 'Festival venues',
    lead: 'Contact+ unfolds across studios, cultural spaces and public places in Chișinău. Use the festival map to find your way between them.',
    mapTitle: 'Find all venues on one map',
    mapText: 'The map gathers every festival location with its exact pin and directions.',
    mapAction: 'Open festival map',
    mapFallback: 'Open the complete map in Google Maps',
    mapDetailAction: 'View venue details',
    listTitle: 'Places in the festival rhythm',
    listText: 'Each venue below links to its exact location and shows the program currently scheduled there.',
    orderNote: 'Venues are listed by their first festival activity.',
    firstActivity: 'First activity',
    addressLabel: 'Address',
    directionsAction: 'Open in Google Maps',
    programLabel: 'Program at this venue',
    moreProgram: (count) => `+ ${count} more in the schedule`,
    scheduleAction: 'View schedule at this venue',
  },
  ro: {
    title: 'Locațiile festivalului',
    lead: 'Contact+ se desfășoară în studiouri, spații culturale și locuri publice din Chișinău. Folosește harta festivalului pentru a te orienta între ele.',
    mapTitle: 'Găsește toate locațiile pe o hartă',
    mapText: 'Harta reunește toate spațiile festivalului, cu puncte exacte și indicații de orientare.',
    mapAction: 'Deschide harta festivalului',
    mapFallback: 'Deschide harta completă în Google Maps',
    mapDetailAction: 'Vezi detaliile locației',
    listTitle: 'Locuri în ritmul festivalului',
    listText: 'Fiecare locație de mai jos are un link către punctul exact și arată programul planificat acolo.',
    orderNote: 'Locațiile sunt listate după prima activitate a festivalului.',
    firstActivity: 'Prima activitate',
    addressLabel: 'Adresă',
    directionsAction: 'Deschide în Google Maps',
    programLabel: 'Program în această locație',
    moreProgram: (count) => `+ încă ${count} în program`,
    scheduleAction: 'Vezi programul în această locație',
  },
  ru: {
    title: 'Площадки фестиваля',
    lead: 'Contact+ проходит в студиях, культурных пространствах и городских местах Кишинёва. Пользуйтесь картой фестиваля, чтобы легко перемещаться между ними.',
    mapTitle: 'Все площадки на одной карте',
    mapText: 'На карте собраны все фестивальные локации с точными метками и маршрутом.',
    mapAction: 'Открыть карту фестиваля',
    mapFallback: 'Открыть полную карту в Google Maps',
    mapDetailAction: 'Открыть информацию о площадке',
    listTitle: 'Места в ритме фестиваля',
    listText: 'У каждой площадки ниже есть точная геометка и актуальная программа, которая проходит здесь.',
    orderNote: 'Площадки расположены по дате первого события фестиваля.',
    firstActivity: 'Первое событие',
    addressLabel: 'Адрес',
    directionsAction: 'Открыть в Google Maps',
    programLabel: 'Программа на этой площадке',
    moreProgram: (count) => `+ ещё ${count} событий в расписании`,
    scheduleAction: 'Открыть программу этой площадки',
  },
};
