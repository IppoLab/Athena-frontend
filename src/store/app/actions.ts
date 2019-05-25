import {ActionContext} from 'vuex';
import {getStoreAccessors} from 'typesafe-vuex';
import {AxiosError} from 'axios';

import router from '@/router';
import {getLocalDarkThemeUsage, saveLocalDarkThemeUsage} from '@/helpers';
import {IAppNotification} from '@/models';
import {State} from '@/store/state';
import {dispatchLogout} from '@/store/auth/actions';

import {commitAddNotification, commitDarkThemeUsage, commitRemoveNotification} from './mutations';
import {AppState} from './state';


export type AppContext = ActionContext<AppState | any, State>;

export const actions = {
    actionChangeDarkThemeUsage: async (context: AppContext, payload: boolean) => {
        saveLocalDarkThemeUsage(payload);
        commitDarkThemeUsage(context, payload);
    },
    actionCheckDarkThemeUsage: async (context: AppContext) => {
        commitDarkThemeUsage(context, getLocalDarkThemeUsage());
    },
    removeNotification: async (context: AppContext, payload: { notification: IAppNotification, timeout: number }) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                commitRemoveNotification(context, payload.notification);
                resolve(true);
            }, payload.timeout);
        });
    },
    actionRouteNotFound: () => {
        router.replace({name: 'not-found'});
    },
    actionCheckApiError: async (context: AppContext, payload: AxiosError) => {
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
            case 500:
                commitAddNotification(context, {content: 'Ошибка сервера, обратитесь к разработчикам', color: 'error'});
                break;
        }
    },
};

const {dispatch} = getStoreAccessors<AppState | any, State>('');

export const dispatchRemoveNotification = dispatch(actions.removeNotification);
export const dispatchChangeDarkThemeUsage = dispatch(actions.actionChangeDarkThemeUsage);
export const dispatchCheckDarkThemeUsage = dispatch(actions.actionCheckDarkThemeUsage);
export const dispatchRouteNotFound = dispatch(actions.actionRouteNotFound);
export const dispatchCheckApiError = dispatch(actions.actionCheckApiError);
