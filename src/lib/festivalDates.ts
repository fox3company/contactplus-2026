import { getLocalized, type Locale } from './locales';

export const dayNameByLabel = {
  'Sep 26': { en: 'Saturday', ro: 'Sâmbătă', ru: 'Суббота' },
  'Sep 27': { en: 'Sunday', ro: 'Duminică', ru: 'Воскресенье' },
  'Sep 28': { en: 'Monday', ro: 'Luni', ru: 'Понедельник' },
  'Sep 29': { en: 'Tuesday', ro: 'Marți', ru: 'Вторник' },
  'Sep 30': { en: 'Wednesday', ro: 'Miercuri', ru: 'Среда' },
  'Oct 1': { en: 'Thursday', ro: 'Joi', ru: 'Четверг' },
  'Oct 2': { en: 'Friday', ro: 'Vineri', ru: 'Пятница' },
  'Oct 3': { en: 'Saturday', ro: 'Sâmbătă', ru: 'Суббота' },
  'Oct 4': { en: 'Sunday', ro: 'Duminică', ru: 'Воскресенье' },
} as const;

export const dayThemeByLabel = {
  'Sep 26': { en: 'Arrival / first meetings', ro: 'Sosire / prime întâlniri', ru: 'Приезд / первые встречи' },
  'Sep 27': { en: 'Festival opening', ro: 'Deschiderea festivalului', ru: 'Открытие фестиваля' },
  'Sep 28': { en: 'Deepening the practice', ro: 'Aprofundarea practicii', ru: 'Погружение в практику' },
  'Sep 29': { en: 'Practice / research / jam', ro: 'Practică / cercetare / jam', ru: 'Практика / исследование / джем' },
  'Sep 30': { en: 'Performance night', ro: 'Seară de performance', ru: 'Вечер перформансов' },
  'Oct 1': { en: 'New intensives / performance night', ro: 'Noi intensive / seară de performance', ru: 'Новые интенсивы / вечер перформансов' },
  'Oct 2': { en: 'Lab showings / teachers performance', ro: 'Showing-uri de laborator / performance-ul profesorilor', ru: 'Показы лабораторий / перформанс преподавателей' },
  'Oct 3': { en: 'Film / showings / celebration', ro: 'Film / showing-uri / celebrare', ru: 'Фильм / показы / празднование' },
  'Oct 4': { en: 'Closing day / dancing in the city', ro: 'Zi de închidere / dansând în oraș', ru: 'Закрытие / танцуя город' },
} as const;

const monthLabels = {
  Sep: { en: 'Sep', ro: 'sept.', ru: 'сент.' },
  Oct: { en: 'Oct', ro: 'oct.', ru: 'окт.' },
} as const;

export type FestivalDayLabel = keyof typeof dayNameByLabel;

export function getLocalizedDateLabel(dateLabel: string, lang: Locale): string {
  return dateLabel.replace(/\b(Sep|Oct)\s+(\d{1,2})\b/g, (_, month: 'Sep' | 'Oct', day: string) => {
    if (lang === 'en') return `${monthLabels[month].en} ${day}`;
    return `${day} ${getLocalized(monthLabels[month], lang)}`;
  });
}

export function getLocalizedDayName(dateLabel: string, lang: Locale): string {
  return getLocalized(dayNameByLabel[dateLabel as FestivalDayLabel], lang);
}

export function getLocalizedDayTheme(dateLabel: string, lang: Locale): string {
  return getLocalized(dayThemeByLabel[dateLabel as FestivalDayLabel], lang);
}

export function getLocalizedDayRangeLabel(dateLabel: string, lang: Locale): string {
  const rangeParts = dateLabel.split('—').map((part) => part.trim());
  const localizedDate = getLocalizedDateLabel(dateLabel, lang);

  if (rangeParts.length === 2) {
    const startDay = getLocalizedDayName(rangeParts[0], lang);
    const endDay = getLocalizedDayName(rangeParts[1], lang);

    if (startDay && endDay) {
      return `${localizedDate} · ${startDay} — ${endDay}`;
    }
  }

  const dayName = getLocalizedDayName(dateLabel, lang);
  return dayName ? `${localizedDate} · ${dayName}` : localizedDate;
}
