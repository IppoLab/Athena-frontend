import {api} from '@/api';
import {
    getLocalDarkThemeUsage,
    getLocalTokens,
    removeLocalTokens,
    saveLocalDarkThemeUsage,
    saveLocalTokens,
} from '@/utils';
import {getStoreAccessors} from 'typesafe-vuex';
import {State} from '@/store/state';
import {MainState} from '@/store/main/state';
import {IAppNotification, IUserInLogin} from '@/interfaces';
import {
    commitAddNotification,
    commitDarkThemeUsage,
    commitRemoveNotification,
    commitSetAuthTokens,
    commitSetLoggedIn,
    commitSetLoginError,
    commitSetUserProfile,
} from '@/store/main/mutations';
import router from '@/router';
import {AxiosError} from 'axios';
import {readAccessToken, readIsLoggedIn, readLoginError, readRefreshToken} from '@/store/main/getters';
import {ActionContext} from 'vuex';
import {dispatchGetUserById} from '@/store/admin/actions';
import {readAdminUserById} from '@/store/admin/getters';

export type MainContext = ActionContext<MainState | any, State>;


const authActions = {
    actionLogin: async (context: MainContext, payload: IUserInLogin) => {
        try {
            const loadingNotification = {content: 'Вход', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.loginGetToken(payload);
            const auth = response.data;
            if (response.data) {
                saveLocalTokens(auth);
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
    actionCheckLoggedIn: async (context: MainContext) => {
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
                        const response = await api.refreshToken(readRefreshToken(context));
                        commitSetAuthTokens(context, response.data);
                        await dispatchCheckLoggedIn(context);
                        return;
                    } catch (e) {
                        await dispatchCheckApiError(context, e);
                    }
                }

                try {
                    const response = await api.getMe(accessToken);
                    commitSetLoggedIn(context, true);
                    await dispatchGetUserById(context, response.data.id);
                    commitSetUserProfile(context, readAdminUserById(context)(response.data.id)!);
                } catch (e) {
                    await dispatchCheckApiError(context, e);
                }
            } else {
                await dispatchRemoveLogin(context);
            }
        }
    },
    actionRemoveLogin: async (context: MainContext) => {
        removeLocalTokens();
        commitSetAuthTokens(context, {access: '', refresh: ''});
        commitSetLoggedIn(context, false);
    },
    actionLogout: async (context: MainContext) => {
        await dispatchRemoveLogin(context);
        await dispatchRouteLogout(context);
        if (!readLoginError(context)) {
            commitAddNotification(context, {content: 'Выход произведен успешно', color: 'success'});
        } else {
            commitAddNotification(context, {content: 'Ошибка входа', color: 'error'});
        }
    },
};

const userProfileActions = {
    actionGetCurrentUserProfile: async (context: MainContext) => {
        try {
            const response = await api.getMe(readAccessToken(context));
            if (response.data) {
                await dispatchGetUserById(context, response.data.id);
                commitSetUserProfile(context, readAdminUserById(context)(response.data.id)!);
            }
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
};

const apiActions = {
    actionCheckApiError: async (context: MainContext, payload: AxiosError) => {
        switch (payload.response!.status) {
            case 400:
                commitAddNotification(context, {content: 'Проверьте введенные данные', color: 'error'});
                break;
            case 401:
                await dispatchLogout(context);
                break;
            case 404:
                await dispatchRouteNotFound(context);
                break;
        }
    },
};

const routesActions = {
    actionRouteNotFound: (context: MainContext) => {
        router.push('/');
    },
    actionRouteLoggedIn: (context: MainContext) => {
        if (router.currentRoute.path === '/login') {
            router.push('/upload');
        }
    },
    actionRouteLogout: (context: MainContext) => {
        if (router.currentRoute.path !== '/login') {
            router.push('/login');
        }
    },
};

const appActions = {
    actionChangeDarkThemeUsage: async (context: MainContext, payload: boolean) => {
        saveLocalDarkThemeUsage(payload);
        commitDarkThemeUsage(context, payload);
    },
    actionCheckDarkThemeUsage: async (context: MainContext) => {
        commitDarkThemeUsage(context, getLocalDarkThemeUsage());
    },
    removeNotification: async (context: MainContext, payload: { notification: IAppNotification, timeout: number }) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                commitRemoveNotification(context, payload.notification);
                resolve(true);
            }, payload.timeout);
        });
    },
};

export const actions = {
    ...authActions,
    ...userProfileActions,
    ...apiActions,
    ...appActions,
    ...routesActions,
};

const {dispatch} = getStoreAccessors<MainState | any, State>('');

export const dispatchRemoveLogin = dispatch(actions.actionRemoveLogin);
export const dispatchLogout = dispatch(actions.actionLogout);
export const dispatchLogin = dispatch(actions.actionLogin);
export const dispatchRouteLoggedIn = dispatch(actions.actionRouteLoggedIn);
export const dispatchRemoveNotification = dispatch(actions.removeNotification);
export const dispatchRouteLogout = dispatch(actions.actionRouteLogout);
export const dispatchCheckLoggedIn = dispatch(actions.actionCheckLoggedIn);
export const dispatchCheckApiError = dispatch(actions.actionCheckApiError);
export const dispatchGetCurrentUserProfile = dispatch(actions.actionGetCurrentUserProfile);
export const dispatchChangeDarkThemeUsage = dispatch(actions.actionChangeDarkThemeUsage);
export const dispatchCheckDarkThemeUsage = dispatch(actions.actionCheckDarkThemeUsage);
export const dispatchRouteNotFound = dispatch(actions.actionRouteNotFound);
