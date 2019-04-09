import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';

import {mainModule} from './main';
import {adminModule} from './admin';
import {State} from './state';

Vue.use(Vuex);

const storeOptions: StoreOptions<State> = {
    modules: {
        main: mainModule,
        admin: adminModule,
    },
};

export const store = new Vuex.Store<State>(storeOptions);

export default store;
