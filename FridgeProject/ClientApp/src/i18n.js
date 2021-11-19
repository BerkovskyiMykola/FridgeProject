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
                Home: "Home",
                ListEmpty: "List is empty",
                Firsname: "Firs name",
                Lastname: "Last name",
                Email: "Email",
                Role: "Role",
                functions: "Functions",
                CreateBackup: "Create backup",
                RestoreВatabase: "Restore database",
                NewUser: "Add New User",
                Create: "Create",
                Edit: "Edit",
                Delete: "Delete",
                Password: "Password",
                EditUser: "Edit User",
                ClickMe: "Click Me",
                Open: "Open",
                Subscribers: "Subscribers",
                NewFridge: "New Fridge",
                AddFridge: "Add Fridge",
                EditFridge: "Edit Fridge",
                FridgeName: "Fridge name",
                Own: "Own",
                Shared: "Shared",
                NameOfProduct: "Name of product",
                Amount: "Amount",
                ExpirationDate: "Expiration date",
                Description: "Description",
                ThrowOut: "Throw out",
                Fridge: "Fridge",
                NewProduct: "New Product",
                AddProduct: "Add Product",
                EditProduct: "Edit Product",
                ThrowOutProduct: "Throw Out Product",
                Bought: "Bought",
                Throw: "Throw Out",
                GetStatistic: "Get Statistic",
                Get: "Get",
                StartDate: "Start date",
                EndDate: "End date",
                Fullname: "Full name",
                AddSubscriber: "Add Subscriber",
                NewSubscriber: "New Subscriber",
                SubscribersOf: "Subscribers of ",
                "Hello, world!": "Hello, world!"
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
                Histories: "Історії",
                Statistic: "Статистика",
                Home: "Домашня сторінка",
                ListEmpty: "Список пустий",
                Firsname: "Ім'я",
                Lastname: "Прізвище",
                Email: "Пошта",
                Role: "Роль",
                functions: "Функції",
                CreateBackup: "Створити бекап",
                RestoreВatabase: "Відновити базу даних",
                NewUser: "Добавити нового користувача",
                Create: "Створити",
                Edit: "Редагувати",
                Delete: "Видалити",
                Password: "Пароль",
                EditUser: "Редагувати користувача",
                ClickMe: "Натисни",
                Open: "Відкрити",
                Subscribers: "Підписники",
                NewFridge: "Новий холодильник",
                AddFridge: "Добавити холодильник",
                EditFridge: "Редагувати холодильник",
                FridgeName: "Назва холодильника",
                Own: "Власні",
                Shared: "Поділилися зі мною",
                NameOfProduct: "Назва продукту",
                Amount: "Кількість",
                ExpirationDate: "Термін придатності",
                Description: "Опис",
                ThrowOut: "Викинути",
                Fridge: "Холодильник",
                NewProduct: "Новий продукт",
                AddProduct: "Добавити продукт",
                EditProduct: "Редагувати продукт",
                ThrowOutProduct: "Викинути продукт",
                Bought: "Купив",
                Throw: "Викинуто",
                GetStatistic: "Отримати статистику",
                Get: "Отримати",
                StartDate: "Початкова дата",
                EndDate: "Кінцева дата",
                Fullname: "ПІБ",
                AddSubscriber: "Добавити підписника",
                NewSubscriber: "Новий підписник",
                SubscribersOf: "Підписники холодильника ",
                "Hello, world!": "Привіт, світ!"
            }
        }
    },
    fallbackLng: "en",
    debug: false,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        useSuspense: false,
    }
});

export default i18n;
