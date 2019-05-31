import {ActionContext} from 'vuex';
import {getStoreAccessors} from 'typesafe-vuex';

import {api} from '@/helpers';
import router from '@/router';
import {dispatchCheckApiError} from '@/store/app/actions';
import {State} from '@/store/state';
import {ISubjectInCreate, ISubjectInUpdate} from '@/models';
import {commitAddNotification, commitRemoveNotification} from '@/store/app/mutations';

import {SubjectsState} from './state';
import {commitSetSubject, commitSetSubjects} from './mutations';


type SubjectsContext = ActionContext<SubjectsState | any, State>;

export const actions = {
    actionCreateSubject: async (context: SubjectsContext, payload: ISubjectInCreate) => {
        try {
            const loadingNotification = {content: 'Создание предмета', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.createSubject(payload);
            commitSetSubject(context, response.data);

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Предмет создан', color: 'success'});

            await dispatchRouteEditSubject(context, response.data.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionRouteSubjectEdit: async (context: SubjectsContext, payload: string) => {
        router.push({name: 'subjects-edit', params: {id: payload}});
    },
    actionGetSubjects: async (context: SubjectsContext) => {
        try {
            const response = await api.getSubjects();
            if (response) {
                commitSetSubjects(context, response.data);
            }
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionChangeSubjectById: async (context: SubjectsContext, payload: { id: string, subject: ISubjectInUpdate }) => {
        try {
            const loadingNotification = {content: 'Изменение предмета', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.changeSubjectById(payload.id, payload.subject);
            commitSetSubject(context, response.data);

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Предмет изменен', color: 'success'});

            await dispatchRouteEditSubject(context, response.data.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
};

const {dispatch} = getStoreAccessors<SubjectsState, State>('');

export const dispatchCreateSubject = dispatch(actions.actionCreateSubject);
export const dispatchGetSubjects = dispatch(actions.actionGetSubjects);
export const dispatchChangeSubjectById = dispatch(actions.actionChangeSubjectById);
export const dispatchRouteEditSubject = dispatch(actions.actionRouteSubjectEdit);
