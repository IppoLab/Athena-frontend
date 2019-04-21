import {mutations} from './mutations';
import {getters} from './getters';
import {actions} from './actions';
import {AdminState} from '@/store/admin/state';

const defaultState: AdminState = {
    users: [],
    subjects: [],
    specialities: [],
    groups: [],
};

export const adminModule = {
    state: defaultState,
    mutations,
    actions,
    getters,
};
