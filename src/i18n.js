import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation from "./translation.json";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .init({
        resources: translation,
        //lng: "en", // if you're using a language detector, do not define the lng option
        //fallbackLng: "cn",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;