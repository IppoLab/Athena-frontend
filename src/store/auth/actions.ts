import {ActionContext} from 'vuex';
import {getStoreAccessors} from 'typesafe-vuex';

import router from '@/router';
import {IUserInLogin} from '@/models';
import {api, getLocalTokens, removeLocalTokens, saveLocalTokens, setAxiosAuthToken} from '@/helpers';
import {State} from '@/store/state';
import {dispatchCheckApiError} from '@/store/app/actions';
import {commitAddNotification, commitRemoveNotification} from '@/store/app/mutations';
import {readUserProfileById} from '@/store/users/getters';
import {commitSetUserProfile} from '@/store/users/mutations';
import {dispatchGetUserById} from '@/store/users/actions';

import {AuthState} from './state';
import {readAccessToken, readIsLoggedIn, readLoginError, readRefreshToken} from './getters';
import {commitSetAuthTokens, commitSetCurrentUserProfile, commitSetLoggedIn, commitSetLoginError} from './mutations';


export type AuthContext = ActionContext<AuthState | any, State>;

export const actions = {
    actionLogin: async (context: AuthContext, payload: IUserInLogin) => {
        try {
            const loadingNotification = {content: 'Вход', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.loginGetToken(payload);
            const auth = response.data;
            if (response.data) {
                saveLocalTokens(auth);

                setAxiosAuthToken(auth.access);

                commitSetAuthTokens(context, auth);
                commitSetLoggedIn(context, true);
                commitSetLoginError(context, false);

                await dispatchGetCurrentUserProfile(context);
                await dispatchRouteLoggedIn(context);

                commitRemoveNotification(context, loadingNotification);
                commitAddNotification(context, {content: 'Вход произведен', color: 'success'});
            } else {
                await dispatchLogout(context);
            }
        } catch (e) {
            commitSetLoginError(context, true);
            await dispatchLogout(context);
        }
    },
    actionCheckLoggedIn: async (context: AuthContext) => {
        if (!readIsLoggedIn(context)) {
            let accessToken = readAccessToken(context);
            if (!accessToken) {
                const localAuth = getLocalTokens();
                if (localAuth.access) {
                    commitSetAuthTokens(context, localAuth);
                    accessToken = localAuth.access;
                }
            }

            if (accessToken) {
                try {
                    await api.verifyToken(accessToken);
                } catch (e) {
                    try {
                        const auth = (await api.refreshToken(readRefreshToken(context))).data;
                        saveLocalTokens(auth);
                        commitSetAuthTokens(context, auth);
                        await dispatchCheckLoggedIn(context);
                        return;
                    } catch (e) {
                        await dispatchCheckApiError(context, e);
                    }
                }

                setAxiosAuthToken(accessToken);

                try {
                    const response = await api.getMe();
                    commitSetLoggedIn(context, true);
                    await dispatchGetUserById(context, response.data.id);
                    commitSetCurrentUserProfile(context, readUserProfileById(context)(response.data.id)!);
                } catch (e) {
                    await dispatchCheckApiError(context, e);
                }
            } else {
                await dispatchRemoveLogin(context);
            }
        }
    },
    actionGetCurrentUserProfile: async (context: AuthContext) => {
        try {
            const response = await api.getMe();
            if (response.data) {
                await dispatchGetUserById(context, response.data.id);
                commitSetCurrentUserProfile(context, readUserProfileById(context)(response.data.id)!);
            }
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionRemoveLogin: async (context: AuthContext) => {
        removeLocalTokens();
        commitSetAuthTokens(context, {access: '', refresh: ''});
        commitSetLoggedIn(context, false);
    },
    actionLogout: async (context: AuthContext) => {
        await dispatchRemoveLogin(context);
        await dispatchRouteLogout(context);
        if (!readLoginError(context)) {
            commitAddNotification(context, {content: 'Выход произведен успешно', color: 'success'});
        } else {
            commitAddNotification(context, {content: 'Ошибка выхода', color: 'error'});
        }
    },
    actionRouteLoggedIn: (context: AuthContext) => {
        if (router.currentRoute.path === '/login') {
            router.push('/upload');
        }
    },
    actionRouteLogout: (context: AuthContext) => {
        if (router.currentRoute.path !== '/login') {
            router.push('/login');
        }
    },
};

const {dispatch} = getStoreAccessors<AuthContext | any, State>('');

export const dispatchRemoveLogin = dispatch(actions.actionRemoveLogin);
export const dispatchLogout = dispatch(actions.actionLogout);
export const dispatchLogin = dispatch(actions.actionLogin);
export const dispatchRouteLoggedIn = dispatch(actions.actionRouteLoggedIn);
export const dispatchRouteLogout = dispatch(actions.actionRouteLogout);
export const dispatchCheckLoggedIn = dispatch(actions.actionCheckLoggedIn);
export const dispatchGetCurrentUserProfile = dispatch(actions.actionGetCurrentUserProfile);
