import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import eventsFr from '../locales/fr/events.json';
import eventsEn from '../locales/en/events.json';

const resources = {
    en: {
        events: eventsEn,
    },
    fr: {
        events: eventsFr,
    }
}

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        debug: false,
        fallbackLng: 'en',
        saveMissing: true
    });

export default i18next;