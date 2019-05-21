import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';

import {State} from './state';
import {appModule} from './app';
import {authModule} from './auth';
import {usersModule} from './users';
import {subjectsModule} from './subjects';
import {specialitiesModule} from './specialities';
import {groupsModule} from './groups';
import {tasksModule} from './tasks';
import {reportsModule} from './reports';

Vue.use(Vuex);

const storeOptions: StoreOptions<State> = {
    modules: {
        app: appModule,
        auth: authModule,
        users: usersModule,
        subjects: subjectsModule,
        specialities: specialitiesModule,
        groups: groupsModule,
        tasks: tasksModule,
        reports: reportsModule,
    },
};

export const store = new Vuex.Store<State>(storeOptions);

export default store;
