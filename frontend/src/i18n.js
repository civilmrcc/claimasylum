import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./data/language/english.js";
import turkish from "./data/language/turkey.js";
import persian from "./data/language/persian.js";
import arabic from "./data/language/arabic.js";
import french from "./data/language/french.js"
import somali from "./data/language/somali.js"


const resources = {
  en: {
    translation: english
  },
  tr: {
    translation: turkish
  },
  fa: {
    translation: persian
  },
  ar: {
    translation: arabic
  },
  fr: {
    translation: french
  },
  so: {
    translation: somali
  },
}

i18n.use(initReactI18next).init({
  resources,
  debug: true,
  fallbackLng: 'en',
  keySeparator: false
});

export default i18n;