import {getStoreAccessors} from 'typesafe-vuex';

import {IAppNotification} from '@/models';
import {State} from '@/store/state';

import {AppState} from './state';

export const mutations = {
    addNotification: (state: AppState, payload: IAppNotification) => {
        state.notifications.push(payload);
    },
    removeNotification: (state: AppState, payload: IAppNotification) => {
        state.notifications = state.notifications.filter((notification) => notification !== payload);
    },
    setDarkThemeUsage: (state: AppState, payload: boolean) => {
        state.useDarkTheme = payload;
    },
};

const {commit} = getStoreAccessors<AppState, State>('');

export const commitAddNotification = commit(mutations.addNotification);
export const commitRemoveNotification = commit(mutations.removeNotification);
export const commitDarkThemeUsage = commit(mutations.setDarkThemeUsage);
