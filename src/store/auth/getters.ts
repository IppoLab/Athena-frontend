import {getStoreAccessors} from 'typesafe-vuex';

import {adminRoleName, studentRoleName, teacherRoleName, tutorRoleName} from '@/configs/constants';
import {userHasRole} from '@/helpers/models';
import {State} from '@/store/state';

import {AuthState} from './state';

export const getters = {
    accessToken: (state: AuthState) => state.accessToken,
    refreshToken: (state: AuthState) => state.refreshToken,
    loginError: (state: AuthState) => state.loginError,
    isLoggedIn: (state: AuthState) => state.isLoggedIn,
    currentUserProfile: (state: AuthState) => state.currentUserProfile,
    userIsAdmin: (state: AuthState) => userHasRole(state.currentUserProfile, adminRoleName),
    userIsStudent: (state: AuthState) => userHasRole(state.currentUserProfile, studentRoleName),
    userIsTutor: (state: AuthState) => userHasRole(state.currentUserProfile, tutorRoleName),
    userIsTeacher: (state: AuthState) => userHasRole(state.currentUserProfile, teacherRoleName),
};

const {read} = getStoreAccessors<AuthState, State>('');

export const readAccessToken = read(getters.accessToken);
export const readRefreshToken = read(getters.refreshToken);
export const readLoginError = read(getters.loginError);
export const readIsLoggedIn = read(getters.isLoggedIn);
export const readCurrentUserProfile = read(getters.currentUserProfile);
export const readUserIsAdmin = read(getters.userIsAdmin);
export const readUserIsStudent = read(getters.userIsStudent);
export const readUserIsTutor = read(getters.userIsTutor);
export const readUserIsTeacher = read(getters.userIsTeacher);

