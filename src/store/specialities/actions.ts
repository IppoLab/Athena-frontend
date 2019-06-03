import {ActionContext} from 'vuex';
import {getStoreAccessors} from 'typesafe-vuex';

import router from '@/router';
import {apiService} from '@/services';
import {State} from '@/store/state';
import {dispatchCheckApiError} from '@/store/app/actions';
import {commitAddNotification, commitRemoveNotification} from '@/store/app/mutations';
import {ISpecialityInCreate, ISpecialityInUpdate} from '@/models';

import {SpecialitiesState} from './state';
import {commitSetSpecialities, commitSetSpeciality} from './mutations';

type SpecialitiesContext = ActionContext<SpecialitiesState | any, State>;


export const actions = {
    actionGetSpecialities: async (context: SpecialitiesContext) => {
        try {
            const response = await apiService.getSpecialities();
            if (response) {
                commitSetSpecialities(context, response.data);
            }
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionCreateSpeciality: async (context: SpecialitiesContext, payload: ISpecialityInCreate) => {
        try {
            const loadingNotification = {content: 'Создание направления', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await apiService.createSpeciality(payload);
            commitSetSpeciality(context, response.data);

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Направление создано', color: 'success'});

            await dispatchRouteEditSpeciality(context, response.data.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionRouteEditSpeciality: async (context: SpecialitiesContext, payload: string) => {
        router.push({name: 'specialities-edit', params: {id: payload}});
    },
    actionChangeSpecialityById: async (
        context: SpecialitiesContext,
        payload: { id: string, speciality: ISpecialityInUpdate },
    ) => {
        try {
            const loadingNotification = {content: 'Изменение направления', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await apiService.changeSpecialityById(
                payload.id,
                payload.speciality,
            );
            commitSetSpeciality(context, response.data);

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Направление изменено', color: 'success'});

            await dispatchRouteEditSpeciality(context, response.data.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
};

const {dispatch} = getStoreAccessors<SpecialitiesState, State>('');


export const dispatchGetSpecialities = dispatch(actions.actionGetSpecialities);
export const dispatchCreateSpeciality = dispatch(actions.actionCreateSpeciality);
export const dispatchRouteEditSpeciality = dispatch(actions.actionRouteEditSpeciality);
export const dispatchChangeSpecialityById = dispatch(actions.actionChangeSpecialityById);
