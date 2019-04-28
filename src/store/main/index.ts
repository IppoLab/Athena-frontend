import {mutations} from './mutations';
import {getters} from './getters';
import {actions} from './actions';
import {MainState} from './state';

const defaultState: MainState = {
    isLoggedIn: null,
    auth: null,
    loginError: false,
    notifications: [],
    userProfile: null,
    studentProfile: null,
    teacherProfile: null,
    useDarkTheme: false,
};

export const mainModule = {
    state: defaultState,
    mutations,
    actions,
    getters,
};
