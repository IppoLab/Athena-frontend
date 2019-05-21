import Vue from 'vue';
import VueLuxon from 'vue-luxon';

Vue.use(VueLuxon, {
    serverZone: 'Europe/Moscow',
    clientZone: 'Europe/Moscow',
    localeLang: 'ru',
});
