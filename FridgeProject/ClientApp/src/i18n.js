import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        en: {
            translations: {
                Users: "Users",
                Profile: "Profile",
                LogOut: "LogOut",
                Login: "Login",
                "Sign Up": "Sign Up",
                Fridges: "Fridges",
                Notifications: "Notifications",
                Histories: "Histories",
                Statistic: "Statistic",
                Home: "Home"
            }
        },
        ua: {
            translations: {
                Users: "Користувачі",
                Profile: "Профіль",
                LogOut: "Вийти",
                Login: "Ввійти",
                "Sign Up": "Зареєструватись",
                Fridges: "Холодильники",
                Notifications: "Сповіщення",
                Histories: "Історія",
                Statistic: "Статистика",
                Home: "Домашня сторінка"
            }
        }
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;
