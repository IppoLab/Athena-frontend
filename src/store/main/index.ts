import {mutations} from './mutations';
import {getters} from './getters';
import {actions} from './actions';
import {MainState} from './state';

const defaultState: MainState = {
    accessToken: '',
    refreshToken: '',

    isLoggedIn: null,
    loginError: false,

    userProfile: null,

    notifications: [],
    useDarkTheme: false,
};

export const mainModule = {
    state: defaultState,
    mutations,
    actions,
    getters,
};
