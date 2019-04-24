import {getStoreAccessors} from 'typesafe-vuex';
import {AdminState} from '@/store/admin/state';
import {State} from '@/store/state';
import {ActionContext} from 'vuex';
import {commitAddNotification, commitRemoveNotification} from '@/store/main/mutations';
import {dispatchCheckApiError} from '@/store/main/actions';
import {
    IGroup,
    IGroupInCreate,
    IGroupInUpdate, IResponseGroup,
    ISpecialityInCreate,
    ISpecialityInUpdate,
    IUserInCreate,
    IUserInUpdate,
} from '@/interfaces';
import {api} from '@/api';
import {
    commitSetGroup, commitSetGroups,
    commitSetSpecialities,
    commitSetSpeciality,
    commitSetSubject,
    commitSetSubjects,
    commitSetUser,
    commitSetUsers,
} from '@/store/admin/mutations';
import router from '@/router';
import {ISubjectInCreate, ISubjectInUpdate} from '@/interfaces/subject';
import {readAdminSpecialities, readAdminSpecialityById} from '@/store/admin/getters';

type MainContext = ActionContext<AdminState, State>;

const usersActions = {
    actionCreateUser: async (context: MainContext, payload: IUserInCreate) => {
        try {
            const loadingNotification = {content: 'Создание пользователя', showProgress: true};
            commitAddNotification(context, loadingNotification);
            const response = await api.createUser(context.rootState.main.token, payload);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Пользователь создан', color: 'success'});
            commitSetUser(context, response.data);
            await dispatchRouteEditUser(context, response.data.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionGetUserById: async (context: MainContext, payload: string) => {
        try {
            const response = await api.getUserById(context.rootState.main.token, payload);
            commitSetUser(context, response.data);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionGetUsers: async (context: MainContext) => {
        try {
            const response = await api.getUsers(context.rootState.main.token);
            if (response) {
                commitSetUsers(context, response.data);
            }
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionRouteUserEdit: async (context: MainContext, payload: string) => {
        router.push({name: 'admin-users-edit', params: {id: payload}});
    },
    actionChangeUserById: async (context: MainContext, payload: { id: string, user: IUserInUpdate }) => {
        try {
            const loadingNotification = {content: 'Изменение пользователя', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.changeUserById(context.rootState.main.token, payload.id, payload.user);
            commitSetUser(context, response.data);

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Пользователь изменен', color: 'success'});

            await dispatchRouteEditUser(context, response.data.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
};

const subjectsActions = {
    actionCreateSubject: async (context: MainContext, payload: ISubjectInCreate) => {
        try {
            const loadingNotification = {content: 'Создание предмета', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.createSubject(context.rootState.main.token, payload);
            commitSetSubject(context, response.data);

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Предмет создан', color: 'success'});

            await dispatchRouteEditSubject(context, response.data.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionRouteSubjectEdit: async (context: MainContext, payload: string) => {
        router.push({name: 'admin-subjects-edit', params: {id: payload}});
    },
    actionGetSubjects: async (context: MainContext) => {
        try {
            const response = await api.getSubjects(context.rootState.main.token);
            if (response) {
                commitSetSubjects(context, response.data);
            }
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionGetSubjectById: async (context: MainContext, payload: string) => {
        try {
            const response = await api.getSubjectById(context.rootState.main.token, payload);
            commitSetSubject(context, response.data);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionChangeSubjectById: async (context: MainContext, payload: { id: string, subject: ISubjectInUpdate }) => {
        try {
            const loadingNotification = {content: 'Изменение предмета', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.changeSubjectById(context.rootState.main.token, payload.id, payload.subject);
            commitSetSubject(context, response.data);

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Предмет изменен', color: 'success'});

            await dispatchRouteEditSubject(context, response.data.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
};

const specialitiesActions = {
    actionGetSpecialities: async (context: MainContext) => {
        try {
            const response = await api.getSpecialities(context.rootState.main.token);
            if (response) {
                commitSetSpecialities(context, response.data);
            }
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionCreateSpeciality: async (context: MainContext, payload: ISpecialityInCreate) => {
        try {
            const loadingNotification = {content: 'Создание направления', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.createSpeciality(context.rootState.main.token, payload);
            commitSetSpeciality(context, response.data);

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Направление создано', color: 'success'});

            await dispatchRouteEditSpeciality(context, response.data.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionRouteEditSpeciality: async (context: MainContext, payload: string) => {
        router.push({name: 'admin-specialities-edit', params: {id: payload}});
    },
    actionChangeSpecialityById: async (
        context: MainContext,
        payload: { id: string, speciality: ISpecialityInUpdate },
    ) => {
        try {
            const loadingNotification = {content: 'Изменение направления', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.changeSpecialityById(
                context.rootState.main.token,
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

const groupsActions = {
    actionGetGroups: async (context: MainContext) => {
        try {
            const response = await api.getGroups(context.rootState.main.token);
            if (response) {
                await dispatchGetSpecialities(context);
                const rawGroups: IResponseGroup[] = response.data;
                const groups: IGroup[] = rawGroups.map((group: IResponseGroup) => {
                    return {
                        id: group.id,
                        name: group.name,
                        speciality: readAdminSpecialityById(context)(group.speciality),
                    };
                });
                commitSetGroups(context, groups);
            }
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionCreateGroup: async (context: MainContext, payload: IGroupInCreate) => {
        try {
            const loadingNotification = {content: 'Создание группы', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.createGroup(context.rootState.main.token, payload);
            const group: IResponseGroup = response.data;
            commitSetGroup(context, {
                id: group.id,
                name: group.name,
                speciality: readAdminSpecialityById(context)(group.speciality),
            });

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Группа создана', color: 'success'});

            await dispatchRouteEditGroup(context, response.data.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionRouteEditGroup: async (context: MainContext, payload: string) => {
        router.push({name: 'admin-groups-edit', params: {id: payload}});
    },
    actionChangeGroupById: async (
        context: MainContext,
        payload: { id: string, group: IGroupInUpdate },
    ) => {
        try {
            const loadingNotification = {content: 'Изменение группы', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.changeGroupById(
                context.rootState.main.token,
                payload.id,
                payload.group,
            );
            const group: IResponseGroup = response.data;
            commitSetGroup(context, {
                id: group.id,
                name: group.name,
                speciality: readAdminSpecialityById(context)(group.speciality),
            });

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Группа изменена', color: 'success'});

            await dispatchRouteEditGroup(context, response.data.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
};

export const actions = {
    ...usersActions,
    ...subjectsActions,
    ...specialitiesActions,
    ...groupsActions,
};

const {dispatch} = getStoreAccessors<AdminState, State>('');

export const dispatchCreateUser = dispatch(actions.actionCreateUser);
export const dispatchGetUserById = dispatch(actions.actionGetUserById);
export const dispatchGetUsers = dispatch(actions.actionGetUsers);
export const dispatchChangeUserById = dispatch(actions.actionChangeUserById);
export const dispatchRouteEditUser = dispatch(actions.actionRouteUserEdit);

export const dispatchCreateSubject = dispatch(actions.actionCreateSubject);
export const dispatchGetSubjects = dispatch(actions.actionGetSubjects);
export const dispatchGetSubjectById = dispatch(actions.actionGetSubjectById);
export const dispatchChangeSubjectById = dispatch(actions.actionChangeSubjectById);
export const dispatchRouteEditSubject = dispatch(actions.actionRouteSubjectEdit);

export const dispatchGetSpecialities = dispatch(actions.actionGetSpecialities);
export const dispatchCreateSpeciality = dispatch(actions.actionCreateSpeciality);
export const dispatchRouteEditSpeciality = dispatch(actions.actionRouteEditSpeciality);
export const dispatchChangeSpecialityById = dispatch(actions.actionChangeSpecialityById);

export const dispatchGetGroups = dispatch(actions.actionGetGroups);
export const dispatchCreateGroup = dispatch(actions.actionCreateGroup);
export const dispatchRouteEditGroup = dispatch(actions.actionRouteEditGroup);
export const dispatchChangeGroupById = dispatch(actions.actionChangeGroupById);
