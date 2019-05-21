import {mutations} from './mutations';
import {getters} from './getters';
import {actions} from './actions';
import {AuthState} from './state';

const defaultState: AuthState = {
    accessToken: '',
    refreshToken: '',
    isLoggedIn: null,
    loginError: false,
    currentUserProfile: null,
};

export const authModule = {
    state: defaultState,
    mutations,
    actions,
    getters,
};
