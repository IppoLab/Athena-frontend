import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: () => import('./views/Start.vue'),
            children: [
                {
                    path: '/',
                    component: () => import('@/views/Home.vue'),
                },
                {
                    path: 'login',
                    component: () => import('@/views/Login.vue'),
                },
                {
                    path: 'profile',
                    component: () => import('@/views/Profile.vue'),
                },
                {
                    path: 'admin',
                    component: () => import('@/views/admin/Admin.vue'),
                    redirect: 'users/all',
                    children: [
                        {
                            path: 'users/create',
                            component: () => import('@/views/admin/CreateUser.vue'),
                        },
                    ],
                },
            ],
        },
        {
            path: '/*',
            redirect: '/',
        },
    ],
});
