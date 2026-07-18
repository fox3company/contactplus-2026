import type { Locale } from './locales';

const media = {
  heroVideo: '/media/about/hero-video.mp4',
  heroPoster: '/media/about/festival-closing.jpg',
  what: '/media/about/what-contact.jpg',
  why: ['/media/about/why-01.jpg', '/media/about/why-02.jpg', '/media/about/why-03.jpg'],
  flow: [
    '/media/about/festival-welcome.jpg',
    '/media/about/ci-practice.jpg',
    '/media/about/performance-2.jpg',
    '/media/about/performance-3.jpg',
    '/media/about/witnessing.jpg',
    '/media/about/evening-gathering.jpg',
  ],
  dayVideo: '/media/about/day-at-contact.mp4',
  dayPoster: '/media/about/performance-lab.jpg',
  who: ['/media/about/festival-flow.jpg', '/media/about/DSC03637.jpg'],
  city: '/media/about/movement-outside.jpg',
  closing: '/media/about/performance-1.jpg',
};

export const aboutCopy: Record<Locale, any> = {
  en: {
    title: 'About Contact+', strapline: 'Movement · Contact Improvisation · Performance',
    lead: 'An international festival where practice, performance and shared time unfold together.',
    date: '26 September — 4 October 2026', place: 'Chișinău, Moldova',
    what: { title: 'What is Contact+', text: 'Contact+ brings together Contact Improvisation, movement practice, performance and the living social space around them. It is more than a sequence of classes or shows: people arrive, practise, watch, talk, dance and make time together.' },
    why: { title: 'Why people come', items: ['To deepen a movement or Contact Improvisation practice.', 'To explore where CI meets performance and composition.', 'To learn and dance over several connected days.', 'To take part in laboratories, performances, JAMs and gatherings.', 'To meet an international movement community in Chișinău.'] },
    unfold: { title: 'How Contact+ unfolds', text: 'The festival moves between distinct program lines and a shared rhythm. Each has its own focus; together they make one experience.', dimensions: ['Contact Improvisation', 'Performance', 'Family & Youth Program', 'Jams & Festival Life'], flow: ['Arrive', 'Practise', 'Explore', 'Witness', 'Share', 'Celebrate'] },
    day: { title: 'A day at Contact+', note: 'This is a possible festival rhythm, not a timetable repeated every day.', items: ['Morning practice', 'CI intensive or class', 'Lunch, rest and conversations', 'Performance lab', 'Performance or showing', 'JAM or evening gathering'] },
    who: { title: 'Who comes', gathering: 'Who gathers here', groups: ['Contact Improvisation practitioners', 'Dancers and performers', 'Movement teachers and artists', 'People curious about embodied and relational practice', 'Families and young movers', 'Local performance audiences'], entry: 'Finding your entry point', entryText: 'Some formats offer an entry point for people newer to Contact Improvisation. Other intensives and performance laboratories may assume previous movement, CI or performance experience. Individual event pages remain the place for specific participation guidance.' },
    city: { title: 'Contact+ in Chișinău', text: 'Contact+ grows from a local movement and performance context while welcoming teachers and artists from elsewhere. The city is not a backdrop to the festival: it is part of the encounters, spaces and conversations that give the week its particular shape.' },
    video: { heroLabel: 'Moving through a Contact+ practice space', vimeoLabel: 'Watch festival film' },
    organisers: { title: 'The people behind Contact+', intro: 'Contact+ is made possible by an organising team rooted in local practice and international exchange.', dance: 'dancers, performers, choreographers and teachers', manager: 'manager', musician: 'instrumentalist and musician', support: 'communication and administrative support for participants', team: 'Team of', community: 'Contact Improvisation Community of Moldova' },
    participation: { title: 'Participation', text: 'Begin by exploring the program and choosing the formats that feel right for your experience and interests. Registration is handled through the festival form.', passes: 'Passes & Participation →', register: 'Register for Contact+ →' },
    faqTitle: 'Questions', faq: [
      ['Do I need previous Contact Improvisation experience?', 'Some formats welcome people newer to CI; others assume previous movement, CI or performance experience. Check individual event pages before choosing.'],
      ['Is Contact+ only for professional dancers?', 'No. The festival brings together practitioners, artists, teachers, curious movers, families and performance audiences.'],
      ['How do I choose a participation format?', 'Start with the program lines, then read individual event pages for format and participation guidance.'],
      ['How do I register?', 'Use the festival registration form.']
    ],
    explore: { title: 'Explore the festival', program: 'Explore the program →', schedule: 'View the schedule →', artists: 'Meet the artists →' },
  },
  ro: {
    title: 'Despre Contact+', strapline: 'Mișcare · Improvizație de contact · Performance',
    lead: 'Un festival internațional în care practica, performance-ul și timpul împărtășit se desfășoară împreună.',
    date: '26 septembrie — 4 octombrie 2026', place: 'Chișinău, Moldova',
    what: { title: 'Ce este Contact+?', text: 'Contact+ aduce împreună Improvizația de contact, practica mișcării, performance-ul și spațiul social viu din jurul lor. Este mai mult decât o succesiune de clase sau spectacole: oamenii sosesc, practică, privesc, vorbesc, dansează și își fac timp unii pentru alții.' },
    why: { title: 'De ce vin oamenii', items: ['Pentru a aprofunda practica mișcării sau a Improvizației de contact.', 'Pentru a explora întâlnirea dintre CI, performance și compoziție.', 'Pentru a învăța și a dansa pe parcursul mai multor zile legate între ele.', 'Pentru a participa la laboratoare, performance-uri, JAM-uri și întâlniri.', 'Pentru a întâlni o comunitate internațională de mișcare în Chișinău.'] },
    unfold: { title: 'Cum se desfășoară Contact+', text: 'Festivalul se mișcă între linii de program distincte și un ritm împărtășit. Fiecare are propriul focus; împreună formează o singură experiență.', dimensions: ['Improvizație de contact', 'Performance', 'Program pentru familii și tineri', 'JAM-uri și viața festivalului'], flow: ['Sosește', 'Practică', 'Explorează', 'Privește', 'Împărtășește', 'Celebrează'] },
    day: { title: 'O zi la Contact+', note: 'Acesta este un posibil ritm al festivalului, nu un orar repetat în fiecare zi.', items: ['Practica de dimineață', 'Intensiv sau clasă de CI', 'Prânz, odihnă și conversații', 'Laborator de performance', 'Performance sau showing', 'JAM sau întâlnire de seară'] },
    who: { title: 'Cine vine', gathering: 'Cine se adună aici', groups: ['Practicanți de Improvizație de contact', 'Dansatori și performeri', 'Profesori de mișcare și artiști', 'Persoane curioase de practica corporală și relațională', 'Familii și tineri în mișcare', 'Public local de performance'], entry: 'Găsește-ți punctul de intrare', entryText: 'Unele formate oferă un punct de intrare pentru persoane mai noi în CI. Alte intensive și laboratoare de performance pot presupune experiență anterioară de mișcare, CI sau performance. Paginile fiecărui eveniment rămân sursa pentru indicații specifice de participare.' },
    city: { title: 'Contact+ în Chișinău', text: 'Contact+ crește dintr-un context local de mișcare și performance și, în același timp, primește profesori și artiști din alte locuri. Orașul nu este doar un fundal al festivalului: face parte din întâlniri, spații și conversații care dau săptămânii forma ei particulară.' },
    video: { heroLabel: 'Mișcare într-un spațiu de practică Contact+', vimeoLabel: 'Privește filmul festivalului' },
    organisers: { title: 'Oamenii din spatele Contact+', intro: 'Contact+ devine posibil printr-o echipă de organizare înrădăcinată în practica locală și schimbul internațional.', dance: 'dansatori, performeri, coregrafi și profesori', manager: 'manager', musician: 'instrumentist și muzician', support: 'sprijin de comunicare și administrativ pentru participanți', team: 'Echipa', community: 'Comunitatea de Improvizație de contact din Moldova' },
    participation: { title: 'Participare', text: 'Începe prin a explora programul și a alege formatele potrivite experienței și intereselor tale. Înregistrarea se face prin formularul festivalului.', passes: 'Abonamente și participare →', register: 'Înregistrează-te la Contact+ →' },
    faqTitle: 'Întrebări', faq: [
      ['Am nevoie de experiență anterioară în Improvizație de contact?', 'Unele formate primesc persoane noi în CI; altele presupun experiență anterioară de mișcare, CI sau performance. Verifică pagina fiecărui eveniment înainte de alegere.'],
      ['Contact+ este doar pentru dansatori profesioniști?', 'Nu. Festivalul reunește practicanți, artiști, profesori, persoane curioase de mișcare, familii și public de performance.'],
      ['Cum aleg un format de participare?', 'Începe cu liniile de program, apoi citește paginile fiecărui eveniment pentru format și indicații de participare.'],
      ['Cum mă înregistrez?', 'Folosește formularul de înregistrare al festivalului.']
    ],
    explore: { title: 'Explorează festivalul', program: 'Explorează programul →', schedule: 'Vezi orarul →', artists: 'Cunoaște artiștii →' },
  },
  ru: {
    title: 'О фестивале Contact+', strapline: 'Движение · Контактная импровизация · Перформанс',
    lead: 'Международный фестиваль, где практика, перформанс и совместное время разворачиваются вместе.',
    date: '26 сентября — 4 октября 2026', place: 'Кишинёв, Молдова',
    what: { title: 'Что такое Contact+?', text: 'Contact+ объединяет Контактную импровизацию, практики движения, перформанс и живое социальное пространство вокруг них. Это больше, чем череда классов или показов: люди приезжают, практикуют, смотрят, разговаривают, танцуют и проводят время вместе.' },
    why: { title: 'Зачем приезжают', items: ['Углубить практику движения или Контактной импровизации.', 'Исследовать встречу CI, перформанса и композиции.', 'Учиться и танцевать несколько связанных между собой дней.', 'Участвовать в лабораториях, перформансах, JAM и встречах.', 'Встретить международное сообщество движения в Кишинёве.'] },
    unfold: { title: 'Как разворачивается Contact+', text: 'Фестиваль движется между разными линиями программы и общим ритмом. У каждой — свой фокус; вместе они складываются в единый опыт.', dimensions: ['Контактная импровизация', 'Перформанс', 'Программа для семей и молодёжи', 'JAM и фестивальная жизнь'], flow: ['Приехать', 'Практиковать', 'Исследовать', 'Смотреть', 'Делиться', 'Праздновать'] },
    day: { title: 'Один день на Contact+', note: 'Это возможный ритм фестиваля, а не расписание, повторяющееся каждый день.', items: ['Утренняя практика', 'CI-интенсив или класс', 'Обед, отдых и разговоры', 'Перформанс-лаборатория', 'Перформанс или показ', 'JAM или вечерняя встреча'] },
    who: { title: 'Кто приезжает', gathering: 'Кто собирается здесь', groups: ['Практикующие Контактную импровизацию', 'Танцовщики и перформеры', 'Преподаватели движения и художники', 'Люди, которым интересны телесные и реляционные практики', 'Семьи и молодые люди в движении', 'Местная аудитория перформанса'], entry: 'Найдите свою точку входа', entryText: 'Некоторые форматы подходят людям, недавно пришедшим в CI. Другие интенсивы и перформанс-лаборатории могут предполагать предыдущий опыт движения, CI или перформанса. Точные рекомендации по участию указаны на страницах отдельных событий.' },
    city: { title: 'Contact+ в Кишинёве', text: 'Contact+ вырастает из местного контекста движения и перформанса и одновременно приглашает преподавателей и художников из других стран. Город — не фон фестиваля: он участвует во встречах, пространствах и разговорах, которые придают этой неделе её особую форму.' },
    video: { heroLabel: 'Движение в пространстве практики Contact+', vimeoLabel: 'Смотреть фильм фестиваля' },
    organisers: { title: 'Люди, которые создают Contact+', intro: 'Contact+ возможен благодаря команде организаторов, укоренённой в местной практике и международном обмене.', dance: 'танцовщики, перформеры, хореографы и преподаватели', manager: 'менеджер', musician: 'инструменталист и музыкант', support: 'коммуникационная и административная поддержка участников', team: 'Команда', community: 'Сообщество Контактной импровизации Молдовы' },
    participation: { title: 'Участие', text: 'Начните с программы и выберите форматы, подходящие вашему опыту и интересам. Регистрация проходит через форму фестиваля.', passes: 'Абонементы и участие →', register: 'Зарегистрироваться на Contact+ →' },
    faqTitle: 'Вопросы', faq: [
      ['Нужен ли опыт Контактной импровизации?', 'Некоторые форматы подходят людям, недавно пришедшим в CI; другие предполагают опыт движения, CI или перформанса. Перед выбором проверьте страницу отдельного события.'],
      ['Contact+ — только для профессиональных танцовщиков?', 'Нет. Фестиваль объединяет практикующих, художников, преподавателей, любопытных к движению людей, семьи и аудиторию перформанса.'],
      ['Как выбрать формат участия?', 'Начните с линий программы, затем прочитайте страницы отдельных событий: там есть описание формата и рекомендации по участию.'],
      ['Как зарегистрироваться?', 'Воспользуйтесь регистрационной формой фестиваля.']
    ],
    explore: { title: 'Исследуйте фестиваль', program: 'Посмотреть программу →', schedule: 'Открыть расписание →', artists: 'Познакомиться с артистами →' },
  },
};

export const aboutMedia = media;
