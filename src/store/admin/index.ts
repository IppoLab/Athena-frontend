import {mutations} from './mutations';
import {getters} from './getters';
import {actions} from './actions';
import {AdminState} from '@/store/admin/state';

const defaultState: AdminState = {
    users: [],
};

export const adminModule = {
    state: defaultState,
    mutations,
    actions,
    getters,
};
