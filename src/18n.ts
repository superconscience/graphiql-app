import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const lang = localStorage.getItem('i18nextLng') || 'en';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: lang,
    debug: false,
    detection: {
      order: ['queryString', 'cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
