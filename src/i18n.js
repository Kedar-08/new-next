import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en.json";
import frTranslation from "./locales/fr.json";
import jaTranslation from "./locales/ja.json";
import ruTranslation from "./locales/ru.json";

// Language resources
const resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  ja: { translation: jaTranslation },
  ru: { translation: ruTranslation }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback if language is not available
    interpolation: { escapeValue: false },
  });

export default i18n;
