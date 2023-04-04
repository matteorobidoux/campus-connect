import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import eventsFr from "../locales/fr/events.json";
import eventsEn from "../locales/en/events.json";
import eventsIt from "../locales/it/events.json";
import languagesEn from "../locales/en/languages.json";
import languagesFr from "../locales/fr/languages.json";
import languagesIt from "../locales/it/languages.json";
import loginEn from "../locales/en/login.json";
import loginFr from "../locales/fr/login.json";
import loginIt from "../locales/it/login.json";
import chatEn from "../locales/en/chat.json";
import chatFr from "../locales/fr/chat.json";
import chatIt from "../locales/it/chat.json";
import profileEn from "../locales/en/profile.json";
import profileFr from "../locales/fr/profile.json";
import profileIt from "../locales/it/profile.json";
import courseEn from "../locales/en/course.json";
import courseFr from "../locales/fr/course.json";
import courseIt from "../locales/it/course.json";

const resources = {
  en: {
    events: eventsEn,
    languages: languagesEn,
    login: loginEn,
    chat: chatEn,
    profile: profileEn,
    course: courseEn,
  },
  fr: {
    events: eventsFr,
    languages: languagesFr,
    login: loginFr,
    chat: chatFr,
    profile: profileFr,
    course: courseFr,
  },
  it: {
    events: eventsIt,
    languages: languagesIt,
    login: loginIt,
    chat: chatIt,
    profile: profileIt,
    course: courseIt,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  debug: false,
  fallbackLng: "en",
  saveMissing: true,
});

export default i18next;
