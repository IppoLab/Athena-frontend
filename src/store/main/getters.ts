import {MainState} from '@/store/main/state';
import {State} from '@/store/state';
import {getStoreAccessors} from 'typesafe-vuex';
import {adminRoleName, studentRoleName, teacherRoleName, tutorRoleName} from '@/constants';

export const getters = {
    loginError: (state: MainState) => state.loginError,
    auth: (state: MainState) => state.auth,
    isLoggedIn: (state: MainState) => state.isLoggedIn,
    firstNotification: (state: MainState) => state.notifications.length > 0 && state.notifications[0],
    userProfile: (state: MainState) => state.userProfile,
    userIsAdmin: (state: MainState) => state.userProfile && state.userProfile.roles.includes(adminRoleName),
    userIsStudent: (state: MainState) => state.userProfile && state.userProfile.roles.includes(studentRoleName),
    userIsTutor: (state: MainState) => state.userProfile && state.userProfile.roles.includes(tutorRoleName),
    userIsTeacher: (state: MainState) => state.userProfile && state.userProfile.roles.includes(teacherRoleName),
    useDarkTheme: (state: MainState) => state.useDarkTheme,
};

const {read} = getStoreAccessors<MainState, State>('');

export const readIsLoggedIn = read(getters.isLoggedIn);
export const readAuth = read(getters.auth);
export const readLoginError = read(getters.loginError);
export const readFirstNotification = read(getters.firstNotification);
export const readUserProfile = read(getters.userProfile);
export const readUserIsAdmin = read(getters.userIsAdmin);
export const readUserIsStudent = read(getters.userIsStudent);
export const readUserIsTutor = read(getters.userIsTutor);
export const readUserIsTeacher = read(getters.userIsTeacher);
export const readUseDarkTheme = read(getters.useDarkTheme);
