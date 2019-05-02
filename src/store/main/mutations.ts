import {getStoreAccessors} from 'typesafe-vuex';
import {IAppNotification, IAuth, IUserProfile} from '@/interfaces';
import {MainState} from '@/store/main/state';
import {State} from '@/store/state';

const authMutations = {
    setAuthTokens: (state: MainState, payload: IAuth) => {
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
    },
    setLoggedIn: (state: MainState, payload: boolean) => {
        state.isLoggedIn = payload;
    },
    setLoginError: (state: MainState, payload: boolean) => {
        state.loginError = payload;
    },
};

const usersMutations = {
    setUserProfile: (state: MainState, payload: IUserProfile) => {
        state.userProfile = payload;
    },
};

const appMutations = {
    addNotification: (state: MainState, payload: IAppNotification) => {
        state.notifications.push(payload);
    },
    removeNotification: (state: MainState, payload: IAppNotification) => {
        state.notifications = state.notifications.filter((notification) => notification !== payload);
    },
    setDarkThemeUsage: (state: MainState, payload: boolean) => {
        state.useDarkTheme = payload;
    },
};

export const mutations = {
    ...authMutations,
    ...usersMutations,
    ...appMutations,
};

const {commit} = getStoreAccessors<MainState, State>('');

export const commitSetAuthTokens = commit(mutations.setAuthTokens);
export const commitSetLoggedIn = commit(mutations.setLoggedIn);
export const commitSetLoginError = commit(mutations.setLoginError);

export const commitSetUserProfile = commit(mutations.setUserProfile);

export const commitAddNotification = commit(mutations.addNotification);
export const commitRemoveNotification = commit(mutations.removeNotification);
export const commitDarkThemeUsage = commit(mutations.setDarkThemeUsage);
