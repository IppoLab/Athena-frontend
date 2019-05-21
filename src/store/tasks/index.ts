import {mutations} from './mutations';
import {getters} from './getters';
import {actions} from './actions';
import {TasksState} from './state';

const defaultState: TasksState = {
    tasks: [],
};

export const tasksModule = {
    state: defaultState,
    mutations,
    actions,
    getters,
};
