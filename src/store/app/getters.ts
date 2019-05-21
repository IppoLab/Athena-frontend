import {getStoreAccessors} from 'typesafe-vuex';

import {State} from '@/store/state';

import {AppState} from './state';


export const getters = {
    firstNotification: (state: AppState) => state.notifications.length > 0 && state.notifications[0],
    useDarkTheme: (state: AppState) => state.useDarkTheme,
};

const {read} = getStoreAccessors<AppState, State>('');

export const readFirstNotification = read(getters.firstNotification);
export const readUseDarkTheme = read(getters.useDarkTheme);
