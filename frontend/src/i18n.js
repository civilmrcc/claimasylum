import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./data/language/english.js";
import german from "./data/language/german.js";
import persian from "./data/language/persian.js";
import arabic from "./data/language/arabic.js";


const resources = {
  en: {
    translation: english
  },
  ger: {
    translation: german
  },
  fa: {
    translation: persian
  },
  ar: {
    translation: arabic
  },
}

i18n.use(initReactI18next).init({
  resources,
  debug: true,
  fallbackLng: 'en',
  keySeparator: false
});

export default i18n;