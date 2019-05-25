import {ActionContext} from 'vuex';
import {getStoreAccessors} from 'typesafe-vuex';

import router from '@/router';
import {userHasRole} from '@/helpers/models';
import {api, loaders} from '@/helpers';
import {studentRoleName, teacherRoleName} from '@/configs/constants';
import {IStudentProfileInUpdate, ITeacherProfileInAPI, IUserProfileInCreate, IUserProfileInUpdate} from '@/models';
import {State} from '@/store/state';
import {commitAddNotification, commitRemoveNotification} from '@/store/app/mutations';
import {dispatchCheckApiError} from '@/store/app/actions';

import {UsersState} from './state';
import {commitSetUserProfile, commitSetUserProfiles} from './mutations';

type UsersContext = ActionContext<UsersState | any, State>;

export const actions = {
    actionCreateUser: async (
        context: UsersContext,
        payload: {
            user: IUserProfileInCreate,
            student?: IStudentProfileInUpdate,
            teacher?: ITeacherProfileInAPI,
        },
    ) => {
        try {
            const loadingNotification = {content: 'Создание пользователя', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const user = (await api.createUserProfile(payload.user)).data;
            if (userHasRole(user, studentRoleName)) {
                await api.changeStudentProfileById(
                    user.id,
                    payload.student!,
                );
            }
            if (userHasRole(user, teacherRoleName)) {
                await api.changeTeacherProfileById(
                    user.id,
                    payload.teacher!,
                );
            }

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Пользователь создан', color: 'success'});
            await dispatchRouteEditUser(context, user.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionGetUserById: async (context: UsersContext, payload: string) => {
        try {
            commitSetUserProfile(context, await loaders.loadUserProfileById(payload));
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionGetUsers: async (context: UsersContext) => {
        try {
            commitSetUserProfiles(context, (await api.getUserProfiles()).data);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionChangeUserById: async (
        context: UsersContext,
        payload: {
            id: string,
            user: IUserProfileInUpdate,
            student?: IStudentProfileInUpdate,
            teacher?: ITeacherProfileInAPI,
        }) => {
        try {
            const loadingNotification = {content: 'Изменение пользователя', showProgress: true};
            commitAddNotification(context, loadingNotification);

            await api.changeUserProfileById(payload.id, payload.user);
            if (userHasRole(payload.user, studentRoleName)) {
                await api.changeStudentProfileById(
                    payload.id,
                    payload.student!,
                );
            }
            if (userHasRole(payload.user, teacherRoleName)) {
                await api.changeTeacherProfileById(
                    payload.id,
                    payload.teacher!,
                );
            }

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Пользователь изменен', color: 'success'});

            await dispatchRouteEditUser(context, payload.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionRouteUserEdit: async (context: UsersContext, payload: string) => {
        router.push({name: 'users-edit', params: {id: payload}});
    },
};

const {dispatch} = getStoreAccessors<UsersState, State>('');

export const dispatchGetUsers = dispatch(actions.actionGetUsers);
export const dispatchGetUserById = dispatch(actions.actionGetUserById);
export const dispatchCreateUser = dispatch(actions.actionCreateUser);
export const dispatchChangeUserById = dispatch(actions.actionChangeUserById);
export const dispatchRouteEditUser = dispatch(actions.actionRouteUserEdit);
