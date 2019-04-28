import {getStoreAccessors} from 'typesafe-vuex';
import {AdminState} from '@/store/admin/state';
import {State} from '@/store/state';
import {ActionContext} from 'vuex';
import {commitAddNotification, commitRemoveNotification} from '@/store/main/mutations';
import {dispatchCheckApiError} from '@/store/main/actions';
import {
    IGroup,
    IGroupInCreate,
    IGroupInUpdate,
    IResponseGroup,
    ISpecialityInCreate,
    ISpecialityInUpdate,
    IStudentProfileInUpdate,
    ITeacherProfileInAPI,
    IUserInCreate,
    IUserInUpdate,
    IUserProfile,
} from '@/interfaces';
import {api} from '@/api';
import {
    commitSetGroup,
    commitSetGroups,
    commitSetSpecialities,
    commitSetSpeciality,
    commitSetSubject,
    commitSetSubjects,
    commitSetUser,
    commitSetUsers,
} from '@/store/admin/mutations';
import router from '@/router';
import {ISubjectInCreate, ISubjectInUpdate} from '@/interfaces/subject';
import {readAdminGroupById, readAdminSpecialityById, readAdminSubjectById} from '@/store/admin/getters';
import {studentRoleName, teacherRoleName} from '@/constants';

type MainContext = ActionContext<AdminState, State>;

const usersActions = {
    actionCreateUser: async (
        context: MainContext,
        payload: {
            user: IUserInCreate,
            student?: IStudentProfileInUpdate,
            teacher?: ITeacherProfileInAPI,
        },
    ) => {
        try {
            const token = context.rootState.main.auth!.access;

            const loadingNotification = {content: 'Создание пользователя', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const userCreationResponse = await api.createUser(token, payload.user);
            const user = userCreationResponse.data as IUserProfile;
            if (payload.user.roles.includes(studentRoleName)) {
                const response = await api.changeStudentProfileById(
                    token,
                    user.id,
                    payload.student!,
                );
                user.studentProfile = response.data;
            }
            if (payload.user.roles.includes(teacherRoleName)) {
                const response = await api.changeTeacherProfileById(
                    token,
                    user.id,
                    payload.teacher!,
                );
                user.teacherProfile = response.data;
            }

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Пользователь создан', color: 'success'});
            commitSetUser(context, user);
            await dispatchRouteEditUser(context, user.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionGetUserById: async (context: MainContext, payload: string) => {
        try {
            const token = context.rootState.main.auth!.access;

            const response = await api.getUserById(token, payload);
            const user = response.data as IUserProfile;

            if (user.roles.includes(studentRoleName)) {
                await dispatchGetGroups(context);

                const studentResponse = (await api.getStudentProfileById(token, user.id)).data;
                user.studentProfile = {
                    cipher: studentResponse!.cipher,
                    studentGroup: readAdminGroupById(context)(studentResponse.studentGroup)!,
                };
            }
            if (user.roles.includes(teacherRoleName)) {
                await dispatchGetSubjects(context);

                const teacherResponse = (await api.getTeacherProfileById(token, user.id)).data as ITeacherProfileInAPI;
                const subjects = teacherResponse.subjects.map(
                    (subjectId: string) => readAdminSubjectById(context)(subjectId)!,
                );

                user.teacherProfile = {
                    subjects,
                };
            }

            commitSetUser(context, user);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionGetUsers: async (context: MainContext) => {
        try {
            const token = context.rootState.main.auth!.access;

            const usersResponse = await api.getUsers(token);
            if (usersResponse) {
                commitSetUsers(context, usersResponse.data);
            }
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionRouteUserEdit: async (context: MainContext, payload: string) => {
        router.push({name: 'admin-users-edit', params: {id: payload}});
    },
    actionChangeUserById: async (
        context: MainContext,
        payload: {
            id: string,
            user: IUserInUpdate,
            student?: IStudentProfileInUpdate,
            teacher?: ITeacherProfileInAPI,
        }) => {
        try {
            const token = context.rootState.main.auth!.access;

            const loadingNotification = {content: 'Изменение пользователя', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const userChangingResponse = await api.changeUserById(token, payload.id, payload.user);
            const user = userChangingResponse.data as IUserProfile;
            if (payload.user.roles!.includes(studentRoleName)) {
                const response = await api.changeStudentProfileById(
                    token,
                    user.id,
                    payload.student!,
                );
                user.studentProfile = response.data;
            }
            if (payload.user.roles!.includes(teacherRoleName)) {
                const response = await api.changeTeacherProfileById(
                    token,
                    user.id,
                    payload.teacher!,
                );
                user.teacherProfile = response.data;
            }

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Пользователь изменен', color: 'success'});
            commitSetUser(context, user);


            await dispatchRouteEditUser(context, userChangingResponse.data.id);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
};

const subjectsActions = {
    actionCreateSubject: async (context: MainContext, payload: ISubjectInCreate) => {
        try {
            const token = context.rootState.main.auth!.access;

            const loadingNotification = {content: 'Создание предмета', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.createSubject(token, payload);
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
            const token = context.rootState.main.auth!.access;

            const response = await api.getSubjects(token);
            if (response) {
                commitSetSubjects(context, response.data);
            }
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionGetSubjectById: async (context: MainContext, payload: string) => {
        try {
            const token = context.rootState.main.auth!.access;

            const response = await api.getSubjectById(token, payload);
            commitSetSubject(context, response.data);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionChangeSubjectById: async (context: MainContext, payload: { id: string, subject: ISubjectInUpdate }) => {
        try {
            const token = context.rootState.main.auth!.access;

            const loadingNotification = {content: 'Изменение предмета', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.changeSubjectById(token, payload.id, payload.subject);
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
            const token = context.rootState.main.auth!.access;

            const response = await api.getSpecialities(token);
            if (response) {
                commitSetSpecialities(context, response.data);
            }
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionCreateSpeciality: async (context: MainContext, payload: ISpecialityInCreate) => {
        try {
            const token = context.rootState.main.auth!.access;

            const loadingNotification = {content: 'Создание направления', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.createSpeciality(token, payload);
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
            const token = context.rootState.main.auth!.access;

            const loadingNotification = {content: 'Изменение направления', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.changeSpecialityById(
                token,
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
            const token = context.rootState.main.auth!.access;

            const response = await api.getGroups(token);
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
            const token = context.rootState.main.auth!.access;

            const loadingNotification = {content: 'Создание группы', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.createGroup(token, payload);
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
            const token = context.rootState.main.auth!.access;

            const loadingNotification = {content: 'Изменение группы', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = await api.changeGroupById(
                token,
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
