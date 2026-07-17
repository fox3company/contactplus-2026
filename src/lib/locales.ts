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
