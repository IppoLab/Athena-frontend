import {mutations} from './mutations';
import {getters} from './getters';
import {actions} from './actions';
import {AppState} from './state';

const defaultState: AppState = {
    notifications: [],
    useDarkTheme: false,
};

export const appModule = {
    state: defaultState,
    mutations,
    actions,
    getters,
};
