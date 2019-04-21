import {AdminState} from '@/store/admin/state';
import {IGroup, ISpeciality, IUserProfile} from '@/interfaces';
import {getStoreAccessors} from 'typesafe-vuex';
import {State} from '@/store/state';
import {ISubject} from '@/interfaces/subject';

const usersMutations = {
    setUsers: (state: AdminState, payload: IUserProfile[]) => {
        state.users = payload;
    },
    setUser: (state: AdminState, payload: IUserProfile) => {
        const users = state.users.filter((user: IUserProfile) => user.id !== payload.id);
        users.push(payload);
        state.users = users;
    },
};

const subjectsMutations = {
    setSubjects: (state: AdminState, payload: ISubject[]) => {
        state.subjects = payload;
    },
    setSubject: (state: AdminState, payload: ISubject) => {
        const subjects = state.subjects.filter((subject: ISubject) => subject.id !== payload.id);
        subjects.push(payload);
        state.subjects = subjects;
    },
};

const specialitiesMutations = {
    setSpecialities: (state: AdminState, payload: ISpeciality[]) => {
        state.specialities = payload;
    },
    setSpeciality: (state: AdminState, payload: ISpeciality) => {
        const specialities = state.specialities.filter((speciality: ISpeciality) => speciality.id !== payload.id);
        specialities.push(payload);
        state.specialities = specialities;
    },
};

const groupsMutations = {
    setGroups: (state: AdminState, payload: IGroup[]) => {
        state.groups = payload;
    },
    setGroup: (state: AdminState, payload: IGroup) => {
        const groups = state.groups.filter((group: IGroup) => group.id !== payload.id);
        groups.push(payload);
        state.groups = groups;
    },
};

export const mutations = {
    ...usersMutations,
    ...subjectsMutations,
    ...specialitiesMutations,
    ...groupsMutations,
};

const {commit} = getStoreAccessors<AdminState, State>('');

export const commitSetUser = commit(mutations.setUser);
export const commitSetUsers = commit(mutations.setUsers);

export const commitSetSubjects = commit(mutations.setSubjects);
export const commitSetSubject = commit(mutations.setSubject);

export const commitSetSpecialities = commit(mutations.setSpecialities);
export const commitSetSpeciality = commit(mutations.setSpeciality);

export const commitSetGroups = commit(mutations.setGroups);
export const commitSetGroup = commit(mutations.setGroup);
