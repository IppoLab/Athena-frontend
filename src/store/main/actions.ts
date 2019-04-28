import {api} from '@/api';
import {darkTheme, getLocalAuth, getLocalTheme, removeLocalAuth, saveLocalAuth, saveLocalTheme} from '@/utils';
import {getStoreAccessors} from 'typesafe-vuex';
import {ActionContext} from 'vuex';
import {State} from '@/store/state';
import {AppNotification, MainState} from '@/store/main/state';
import {IAuth, IUserInLogin} from '@/interfaces';
import {
    commitAddNotification,
    commitDarkThemeUsage,
    commitRemoveNotification,
    commitSetAuth,
    commitSetLoggedIn,
    commitSetLoginError,
    commitSetUserProfile,
} from '@/store/main/mutations';
import router from '@/router';
import {AxiosError} from 'axios';
import {readLoginError} from '@/store/main/getters';

type MainContext = ActionContext<MainState, State>;

export const actions = {
    actionLogin: async (context: MainContext, payload: IUserInLogin) => {
        try {
            const response = await api.loginGetToken(payload);
            const auth = response.data as IAuth;
            if (auth) {
                saveLocalAuth(auth);
                commitSetAuth(context, auth);
                commitSetLoggedIn(context, true);
                commitSetLoginError(context, false);
                await dispatchGetUserProfile(context);
                await dispatchRouteLoggedIn(context);
                commitAddNotification(context, {content: 'Вход произведен', color: 'success'});
            } else {
                await dispatchLogout(context);
            }
        } catch (e) {
            commitSetLoginError(context, true);
            await dispatchLogout(context);
        }
    },
    actionGetUserProfile: async (context: MainContext) => {
        try {
            const response = await api.getMe(context.state.auth!.access);
            if (response.data) {
                commitSetUserProfile(context, response.data);
            }
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionChangeTheme: async (context: MainContext, payload: string) => {
        commitDarkThemeUsage(context, payload === darkTheme);
        saveLocalTheme(payload);
    },
    actionCheckTheme: async (context: MainContext) => {
        const userTheme = getLocalTheme();
        if (userTheme) {
            commitDarkThemeUsage(context, userTheme === darkTheme);
        }
    },
    actionCheckLoggedIn: async (context: MainContext) => {
        if (!context.state.isLoggedIn) {
            let auth = context.state.auth;
            if (!auth) {
                const localAuth = getLocalAuth();
                if (localAuth.access) {
                    commitSetAuth(context, localAuth);
                    auth = localAuth;
                }
            }

            if (auth) {
                try {
                    await api.verifyToken(auth.access);
                } catch (e) {
                    try {
                        const response = await api.refreshToken(auth.refresh);
                        auth = response.data;
                        commitSetAuth(context, auth!);
                        await dispatchCheckLoggedIn(context);
                    } catch (e) {
                        await dispatchCheckApiError(context, e);
                    }
                }

                try {
                    const response = await api.getMe(auth!.access);
                    commitSetLoggedIn(context, true);
                    commitSetUserProfile(context, response.data);
                } catch (e) {
                    await dispatchCheckApiError(context, e);
                }
            } else {
                await dispatchRemoveLogin(context);
            }
        }
    },
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
    actionRemoveLogin: async (context: MainContext) => {
        removeLocalAuth();
        commitSetAuth(context, null);
        commitSetLoggedIn(context, false);
    },
    actionLogout: async (context: MainContext) => {
        await dispatchRemoveLogin(context);
        await dispatchRouteLogout(context);
        if (!readLoginError(context)) {
            commitAddNotification(context, {content: 'Выход произведен успешно', color: 'success'});
        }
    },
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
    removeNotification: async (context: MainContext, payload: { notification: AppNotification, timeout: number }) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commitRemoveNotification(context, payload.notification);
                resolve(true);
            }, payload.timeout);
        });
    },
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
export const dispatchGetUserProfile = dispatch(actions.actionGetUserProfile);
export const dispatchChangeTheme = dispatch(actions.actionChangeTheme);
export const dispatchCheckTheme = dispatch(actions.actionCheckTheme);
export const dispatchRouteNotFound = dispatch(actions.actionRouteNotFound);
