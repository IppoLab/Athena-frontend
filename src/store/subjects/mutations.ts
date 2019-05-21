import {getStoreAccessors} from 'typesafe-vuex';

import {ISubject} from '@/models';
import {State} from '@/store/state';

import {SubjectsState} from './state';

export const mutations = {
    setSubjects: (state: SubjectsState, payload: ISubject[]) => {
        state.subjects = payload;
    },
    setSubject: (state: SubjectsState, payload: ISubject) => {
        const subjects = state.subjects.filter((subject: ISubject) => subject.id !== payload.id);
        subjects.push(payload);
        state.subjects = subjects;
    },
};

const {commit} = getStoreAccessors<SubjectsState, State>('');

export const commitSetSubjects = commit(mutations.setSubjects);
export const commitSetSubject = commit(mutations.setSubject);
