import {getStoreAccessors} from 'typesafe-vuex';
import {ActionContext} from 'vuex';

import {State} from '@/store/state';
import {api} from '@/helpers/api';
import {ITask, ITaskInCreate, ITaskInResponse, ITaskInUpdate} from '@/models/tasks';
import {dispatchCheckApiError} from '@/store/app/actions';
import {readGroupById} from '@/store/groups/getters';
import {readSubjectById} from '@/store/subjects/getters';

import {TasksState} from './state';
import {commitSetTask, commitSetTasks} from './mutations';
import router from '@/router';
import {commitAddNotification, commitRemoveNotification} from '@/store/app/mutations';
import {loaders} from '@/helpers';


type TasksContext = ActionContext<TasksState | any, State>;

export const actions = {
    actionGetTasks: async (context: TasksContext) => {
        try {
            const tasks = await loaders.loadAllTasks();
            commitSetTasks(context, tasks);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionCreateTask: async (context: TasksContext, payload: ITaskInCreate) => {
        try {
            const loadingNotification = {content: 'Изменение задания', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = (await api.createTask(payload)).data;

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Задание изменено', color: 'success'});

            await dispatchRouteEditTask(context, response.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionGetTaskById: async (context: TasksContext, payload: string) => {
        try {
            commitSetTask(context, await loaders.loadTaskById(payload));
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionUpdateTaskById: async (context: TasksContext, payload: {
        id: string,
        task: ITaskInUpdate,
    }) => {
        try {
            const loadingNotification = {content: 'Изменение задания', showProgress: true};
            commitAddNotification(context, loadingNotification);

            await api.updateTaskById(payload.id, payload.task);

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Задание изменено', color: 'success'});

            await dispatchRouteEditTask(context, payload.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionRouteTaskEdit: async (context: TasksContext, payload: string) => {
        router.push({name: 'tasks-edit', params: {id: payload}});
    },
    actionRouteTaskView: async (context: TasksContext, payload: string) => {
        router.push({name: 'tasks-view', params: {id: payload}});
    },
};

const {dispatch} = getStoreAccessors<TasksState, State>('');

export const dispatchGetTasks = dispatch(actions.actionGetTasks);
export const dispatchCreateTask = dispatch(actions.actionCreateTask);
export const dispatchGetTaskById = dispatch(actions.actionGetTaskById);
export const dispatchUpdateTaskById = dispatch(actions.actionUpdateTaskById);
export const dispatchRouteEditTask = dispatch(actions.actionRouteTaskEdit);
export const dispatchRouteViewTask = dispatch(actions.actionRouteTaskView);
