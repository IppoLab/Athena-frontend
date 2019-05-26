import store from '@/store';
import {readIsLoggedIn, readUserIsAdmin} from '@/store/auth/getters';
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
