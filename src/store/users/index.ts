import {getters} from './getters';
import {mutations} from './mutations';
import {actions} from './actions';
import {UsersState} from './state';

const defaultState: UsersState = {
    users: [],
};

export const usersModule = {
    state: defaultState,
    mutations,
    actions,
    getters,
};
