import {api} from '@/api';
import {
    darkTheme,
    getLocalTheme,
    getLocalToken,
    removeLocalToken,
    saveLocalTheme,
    saveLocalToken,
} from '@/utils';
import {getStoreAccessors} from 'typesafe-vuex';
import {ActionContext} from 'vuex';
import {State} from '@/store/state';
import {AppNotification, MainState} from '@/store/main/state';
import {IUserInLogin} from '@/interfaces';
import {
    commitAddNotification,
    commitDarkThemeUsage,
    commitRemoveNotification,
    commitSetLoggedIn,
    commitSetLoginError,
    commitSetToken,
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
            const token = response.data.token;
            if (token) {
                saveLocalToken(token);
                commitSetToken(context, token);
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
            const response = await api.getMe(context.state.token);
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
            let token = context.state.token;
            if (!token) {
                const localToken = getLocalToken();
                if (localToken) {
                    commitSetToken(context, localToken);
                    token = localToken;
                }
            }
            if (token) {
                try {
                    const response = await api.getMe(token);
                    commitSetLoggedIn(context, true);
                    commitSetUserProfile(context, response.data);
                } catch (error) {
                    try {
                        const response = await api.refreshToken(token);
                        commitSetToken(context, response.data.token);
                        await dispatchCheckLoggedIn(context);
                    } catch (e) {
                        await dispatchRemoveLogin(context);
                    }
                    await dispatchRemoveLogin(context);
                }
            } else {
                await dispatchRemoveLogin(context);
            }
        }
    },
    actionCheckApiError: async (context: MainContext, payload: AxiosError) => {
        if (payload.response!.status === 401) {
            await dispatchLogout(context);
        }
    },
    actionRemoveLogin: async (context: MainContext) => {
        removeLocalToken();
        commitSetToken(context, '');
        commitSetLoggedIn(context, false);
    },
    actionLogout: async (context: MainContext) => {
        await dispatchRemoveLogin(context);
        await dispatchRouteLogout(context);
        if (!readLoginError(context)) {
            commitAddNotification(context, {content: 'Выход произведен успешно', color: 'success'});
        }
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
