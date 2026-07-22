export const locales = ['en', 'ro', 'ru'] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  ro: 'RO',
  ru: 'RU',
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocalized(
  value: Partial<Record<Locale, string>> | undefined,
  locale: Locale,
): string {
  return value?.[locale] || value?.en || '';
}

const countryLabels: Record<string, Record<Locale, string>> = {
  Austria: { en: 'Austria', ro: 'Austria', ru: 'Австрия' },
  Bulgaria: { en: 'Bulgaria', ro: 'Bulgaria', ru: 'Болгария' },
  Colombia: { en: 'Colombia', ro: 'Columbia', ru: 'Колумбия' },
  Finland: { en: 'Finland', ro: 'Finlanda', ru: 'Финляндия' },
  Germany: { en: 'Germany', ro: 'Germania', ru: 'Германия' },
  Latvia: { en: 'Latvia', ro: 'Letonia', ru: 'Латвия' },
  Moldova: { en: 'Moldova', ro: 'Moldova', ru: 'Молдова' },
  Netherlands: { en: 'Netherlands', ro: 'Țările de Jos', ru: 'Нидерланды' },
  Norway: { en: 'Norway', ro: 'Norvegia', ru: 'Норвегия' },
  Poland: { en: 'Poland', ro: 'Polonia', ru: 'Польша' },
  Romania: { en: 'Romania', ro: 'România', ru: 'Румыния' },
  Spain: { en: 'Spain', ro: 'Spania', ru: 'Испания' },
  Sweden: { en: 'Sweden', ro: 'Suedia', ru: 'Швеция' },
  UK: { en: 'UK', ro: 'Regatul Unit', ru: 'Великобритания' },
  Ukraine: { en: 'Ukraine', ro: 'Ucraina', ru: 'Украина' },
};

export function getLocalizedCountryDisplay(value: string | undefined, locale: Locale): string {
  if (!value) return '';

  return value
    .split('/')
    .map((part) => {
      const country = part.trim();
      return countryLabels[country]?.[locale] || country;
    })
    .join(' / ');
}
