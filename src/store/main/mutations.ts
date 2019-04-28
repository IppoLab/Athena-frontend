import {AppNotification, MainState} from './state';
import {getStoreAccessors} from 'typesafe-vuex';
import {State} from '@/store/state';
import {IAuth, IUserProfile} from '@/interfaces';

export const mutations = {
    setAuth: (state: MainState, payload: IAuth | null) => {
        state.auth = payload;
    },
    setLoggedIn: (state: MainState, payload: boolean) => {
        state.isLoggedIn = payload;
    },
    setLoginError: (state: MainState, payload: boolean) => {
        state.loginError = payload;
    },
    addNotification: (state: MainState, payload: AppNotification) => {
        state.notifications.push(payload);
    },
    removeNotification: (state: MainState, payload: AppNotification) => {
        state.notifications = state.notifications.filter((notification) => notification !== payload);
    },
    setUserProfile: (state: MainState, payload: IUserProfile) => {
        state.userProfile = payload;
    },
    setDarkThemeUsage: (state: MainState, payload: boolean) => {
        state.useDarkTheme = payload;
    },
};

const {commit} = getStoreAccessors<MainState | any, State>('');

export const commitSetAuth = commit(mutations.setAuth);
export const commitSetLoggedIn = commit(mutations.setLoggedIn);
export const commitSetLoginError = commit(mutations.setLoginError);
export const commitAddNotification = commit(mutations.addNotification);
export const commitRemoveNotification = commit(mutations.removeNotification);
export const commitSetUserProfile = commit(mutations.setUserProfile);
export const commitDarkThemeUsage = commit(mutations.setDarkThemeUsage);
