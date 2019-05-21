import {getStoreAccessors} from 'typesafe-vuex';

import {State} from '@/store/state';

import {SubjectsState} from './state';

export const getters = {
    subjects: (state: SubjectsState) => state.subjects,
    subjectById: (state: SubjectsState) => (subjectId: string) => {
        const filteredSubjects = state.subjects.filter((subject) => subject.id === subjectId);
        if (filteredSubjects.length > 0) {
            return filteredSubjects[0];
        }
        return null;
    },
};

const {read} = getStoreAccessors<SubjectsState, State>('');

export const readSubjects = read(getters.subjects);
export const readSubjectById = read(getters.subjectById);
