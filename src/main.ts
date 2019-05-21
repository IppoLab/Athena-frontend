import '@babel/polyfill';

import Vue from 'vue';

import './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import './plugins/vee-validate';
import './plugins/vue-luxon';

import App from './App.vue';
import router from './router';
import store from './store';

import './configs/component-hooks';
import './configs/register-service-worker';


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
