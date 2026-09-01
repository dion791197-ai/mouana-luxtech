import en from '@/dictionaries/en.json';
import ru from '@/dictionaries/ru.json';
import zh from '@/dictionaries/zh.json';
import th from '@/dictionaries/th.json';

export const locales = ['en', 'ru', 'zh', 'th'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

const dictionaries = { en, ru, zh, th } satisfies Record<Locale, unknown>;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}

export const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
] as const;
