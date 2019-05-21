import {getStoreAccessors} from 'typesafe-vuex';

import {State} from '@/store/state';
import {IAuthResponse, IUserProfile} from '@/models';

import {AuthState} from './state';

export const mutations = {
    setAuthTokens: (state: AuthState, payload: IAuthResponse) => {
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
    },
    setLoggedIn: (state: AuthState, payload: boolean) => {
        state.isLoggedIn = payload;
    },
    setLoginError: (state: AuthState, payload: boolean) => {
        state.loginError = payload;
    },
    setCurrentUserProfile: (state: AuthState, payload: IUserProfile) => {
        state.currentUserProfile = payload;
    },
};

const {commit} = getStoreAccessors<AuthState, State>('');

export const commitSetAuthTokens = commit(mutations.setAuthTokens);
export const commitSetLoggedIn = commit(mutations.setLoggedIn);
export const commitSetLoginError = commit(mutations.setLoginError);

export const commitSetCurrentUserProfile = commit(mutations.setCurrentUserProfile);

