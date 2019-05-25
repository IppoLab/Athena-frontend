import {ActionContext} from 'vuex';
import {getStoreAccessors} from 'typesafe-vuex';

import router from '@/router';
import {api, loaders} from '@/helpers';
import {IGroupInCreate, IGroupInUpdate} from '@/models';
import {State} from '@/store/state';
import {commitSetGroup, commitSetGroups} from '@/store/groups/mutations';
import {dispatchCheckApiError} from '@/store/app/actions';
import {commitAddNotification, commitRemoveNotification} from '@/store/app/mutations';

import {GroupsState} from './state';

type GroupsContext = ActionContext<GroupsState | any, State>;

export const actions = {
    actionGetGroups: async (context: GroupsContext) => {
        try {
            commitSetGroups(context, await loaders.loadAllGroups());
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionGetGroupById: async (context: GroupsContext, payload: string) => {
        try {
            commitSetGroup(context, await loaders.loadGroupById(payload));
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionCreateGroup: async (context: GroupsContext, payload: IGroupInCreate) => {
        try {
            const loadingNotification = {content: 'Создание группы', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = (await api.createGroup(payload)).data;

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Группа создана', color: 'success'});

            await dispatchRouteEditGroup(context, response.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionRouteEditGroup: async (context: GroupsContext, payload: string) => {
        router.push({name: 'groups-edit', params: {id: payload}});
    },
    actionChangeGroupById: async (
        context: GroupsContext,
        payload: { id: string, group: IGroupInUpdate },
    ) => {
        try {
            const loadingNotification = {content: 'Изменение группы', showProgress: true};
            commitAddNotification(context, loadingNotification);

            await api.changeGroupById(payload.id, payload.group);

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Группа изменена', color: 'success'});

            await dispatchRouteEditGroup(context, payload.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
};

const {dispatch} = getStoreAccessors<GroupsState, State>('');

export const dispatchGetGroups = dispatch(actions.actionGetGroups);
export const dispatchCreateGroup = dispatch(actions.actionCreateGroup);
export const dispatchChangeGroupById = dispatch(actions.actionChangeGroupById);
export const dispatchGetGroupById = dispatch(actions.actionGetGroupById);
export const dispatchRouteEditGroup = dispatch(actions.actionRouteEditGroup);
