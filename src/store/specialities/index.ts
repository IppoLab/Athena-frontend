import {mutations} from './mutations';
import {getters} from './getters';
import {actions} from './actions';
import {SpecialitiesState} from './state';

const defaultState: SpecialitiesState = {
    specialities: [],
};

export const specialitiesModule = {
    state: defaultState,
    mutations,
    actions,
    getters,
};
