import store from '@/store';
import {readIsLoggedIn, readUserIsAdmin, readUserIsStudent, readUserIsTutor} from '@/store/auth/getters';
import {dispatchCheckLoggedIn} from '@/store/auth/actions';

export async function adminRouteGuard(to, from, next) {
    if (!readUserIsAdmin(store)) {
        next({name: 'not-found'});
    } else {
        next();
    }
}

export async function authRouteGuard(to, from, next) {
    await dispatchCheckLoggedIn(store);
    const userLoggedIn = readIsLoggedIn(store);
    if (to.path !== '/login' && !userLoggedIn) {
        next('/login');
    } else if (to.path === '/login' && userLoggedIn) {
        next('/');
    } else {
        next();
    }
}

export async function typeRouteGuard(to, from, next) {
    const type = to.params.type;
    if (type === 'student' && readUserIsStudent(store)) {
        next();
    } else if (type === 'tutor' && readUserIsTutor(store)) {
        next();
    } else {
        next({name: 'not-found'});
    }
}
