import {getters} from './getters';
import {mutations} from './mutations';
import {actions} from './actions';
import {ReportsState} from './state';

const defaultState: ReportsState = {
    reports: [],
};

export const reportsModule = {
    state: defaultState,
    mutations,
    actions,
    getters,
};
