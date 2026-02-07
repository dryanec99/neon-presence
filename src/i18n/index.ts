import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import bg from './locales/bg.json';
import ru from './locales/ru.json';

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
] as const;

export type LanguageCode = typeof languages[number]['code'];

const resources = {
  en: { translation: en },
  bg: { translation: bg },
  ru: { translation: ru },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'bg', 'ru'],
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
