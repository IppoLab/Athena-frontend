import {AdminState} from './state';
import {getStoreAccessors} from 'typesafe-vuex';
import {State} from '@/store/state';
import Admin from '@/views/admin/Admin.vue';
import get = Reflect.get;

const usersGetters = {
    adminUsers: (state: AdminState) => state.users,
    adminUserById: (state: AdminState) => (userId: string) => {
        const filteredUsers = state.users.filter((user) => user.id === userId);
        if (filteredUsers.length > 0) {
            return filteredUsers[0];
        }
        return null;
    },
};

const subjectsGetters = {
    adminSubjects: (state: AdminState) => state.subjects,
    adminSubjectById: (state: AdminState) => (subjectId: string) => {
        const filteredSubjects = state.subjects.filter((subject) => subject.id === subjectId);
        if (filteredSubjects.length > 0) {
            return filteredSubjects[0];
        }
        return null;
    },
};

const specialitiesGetters = {
    adminSpecialities: (state: AdminState) => state.specialities,
    adminSpecialityById: (state: AdminState) => (specialityId: string) => {
        const filteredSpecialities = state.specialities.filter((speciality) => speciality.id === specialityId);
        if (filteredSpecialities.length > 0) {
            return filteredSpecialities[0];
        }
        return null;
    },
};

const groupsGetters = {
    adminGroups: (state: AdminState) => state.groups,
    adminGroupById: (state: AdminState) => (groupId: string) => {
        const filteredGroups = state.groups.filter((group) => group.id === groupId);
        if (filteredGroups.length > 0) {
            return filteredGroups[0];
        }
        return null;
    },
};

export const getters = {
    ...usersGetters,
    ...subjectsGetters,
    ...specialitiesGetters,
    ...groupsGetters,
};

const {read} = getStoreAccessors<AdminState, State>('');

export const readAdminUserById = read(getters.adminUserById);
export const readAdminUsers = read(getters.adminUsers);

export const readAdminSubjects = read(getters.adminSubjects);
export const readAdminSubjectById = read(getters.adminSubjectById);

export const readAdminSpecialities = read(getters.adminSpecialities);
export const readAdminSpecialityById = read(getters.adminSpecialityById);

export const readAdminGroups = read(getters.adminGroups);
export const readAdminGroupById = read(getters.adminGroupById);
