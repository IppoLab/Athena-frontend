import {mutations} from './mutations';
import {getters} from './getters';
import {actions} from './actions';
import {SubjectsState} from './state';

const defaultState: SubjectsState = {
    subjects: [],
};

export const subjectsModule = {
    state: defaultState,
    mutations,
    actions,
    getters,
};
