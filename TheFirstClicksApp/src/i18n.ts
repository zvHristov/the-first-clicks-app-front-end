import i18n from "i18next";
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from "react-i18next";
// the translations
// (tip move them in a JSON file and import them)
export const defaultLocale = 'en';
const languages = [defaultLocale, 'bg', 'de']; /// here add other lang local bg, pr, etc.
const SLASH = '/';
export const storageLocaleKey = 'locale';

const getLocale = () => {
    const pathParts = window.location.pathname.split(SLASH);
    let locale;

    if (pathParts[0] === "") {
        locale = pathParts[1];
    } else {
        locale = pathParts[0]
    }

    if (languages.includes(locale)) {
        return locale;
    } else {
        return defaultLocale;
    }
};

const locale = getLocale();
localStorage.setItem(storageLocaleKey, locale);

export const getCurrentLocale = () => {
    return localStorage.getItem(storageLocaleKey) || defaultLocale;
};

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        whitelist: languages,
        load: 'currentOnly',
        lng: locale,
        lowerCaseLng: true,
        debug: false,
        interpolation: {
            escapeValue: false
        },
        ns: [
            'translation',
            // 'errors',
            // 'other',
            // 'can put form',
            // .....languages
        ],
        defaultNS: 'translation',
        backend: {
            loadPath:  `/locales/{{lng}}/{{ns}}.json`
        },
        react: {
            wait: true
        },
        cache: {
            enabled: false,
        },
        cleanCode: true

    });

export default i18n;
