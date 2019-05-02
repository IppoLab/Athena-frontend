import {State} from '@/store/state';
import {getStoreAccessors} from 'typesafe-vuex';
import {adminRoleName, studentRoleName, teacherRoleName, tutorRoleName} from '@/constants';
import {MainState} from '@/store/main/state';

const authGetters = {
    accessToken: (state: MainState) => state.accessToken,
    refreshToken: (state: MainState) => state.refreshToken,
    loginError: (state: MainState) => state.loginError,
    isLoggedIn: (state: MainState) => state.isLoggedIn,
};

const userProfileGetters = {
    userProfile: (state: MainState) => state.userProfile,
    userIsAdmin: (state: MainState) => state.userProfile && state.userProfile.roles.includes(adminRoleName),
    userIsStudent: (state: MainState) => state.userProfile && state.userProfile.roles.includes(studentRoleName),
    userIsTutor: (state: MainState) => state.userProfile && state.userProfile.roles.includes(tutorRoleName),
    userIsTeacher: (state: MainState) => state.userProfile && state.userProfile.roles.includes(teacherRoleName),
};

const appGetters = {
    firstNotification: (state: MainState) => state.notifications.length > 0 && state.notifications[0],
    useDarkTheme: (state: MainState) => state.useDarkTheme,
};

export const getters = {
    ...authGetters,
    ...userProfileGetters,
    ...appGetters,
};

const {read} = getStoreAccessors<MainState, State>('');

export const readAccessToken = read(getters.accessToken);
export const readRefreshToken = read(getters.refreshToken);
export const readLoginError = read(getters.loginError);
export const readIsLoggedIn = read(getters.isLoggedIn);

export const readUserProfile = read(getters.userProfile);
export const readUserIsAdmin = read(getters.userIsAdmin);
export const readUserIsStudent = read(getters.userIsStudent);
export const readUserIsTutor = read(getters.userIsTutor);
export const readUserIsTeacher = read(getters.userIsTeacher);

export const readFirstNotification = read(getters.firstNotification);
export const readUseDarkTheme = read(getters.useDarkTheme);
