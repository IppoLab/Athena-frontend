import {mutations} from './mutations';
import {getters} from './getters';
import {actions} from './actions';
import {GroupsState} from './state';

const defaultState: GroupsState = {
    groups: [],
};

export const groupsModule = {
    state: defaultState,
    mutations,
    actions,
    getters,
};
