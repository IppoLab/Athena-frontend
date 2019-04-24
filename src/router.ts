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
                            path: 'users',
                            redirect: 'all',
                            component: () => import('@/views/admin/users/Users.vue'),
                            children: [
                                {
                                    path: 'all',
                                    component: () => import('@/views/admin/users/ListUsers.vue'),
                                },
                                {
                                    path: 'create',
                                    component: () => import('@/views/admin/users/CreateUser.vue'),
                                },
                                {
                                    path: 'edit/:id',
                                    name: 'admin-users-edit',
                                    component: () => import('@/views/admin/users/EditUser.vue'),
                                },
                            ],
                        },
                        {
                            path: 'subjects',
                            component: () => import('@/views/admin/subjects/Subjects.vue'),
                            redirect: 'all',
                            children: [
                                {
                                    path: 'all',
                                    component: () => import('@/views/admin/subjects/ListSubjects.vue'),
                                },
                                {
                                    path: 'create',
                                    component: () => import('@/views/admin/subjects/CreateSubject.vue'),
                                },
                                {
                                    path: 'edit/:id',
                                    name: 'admin-subjects-edit',
                                    component: () => import('@/views/admin/subjects/EditSubject.vue'),
                                },
                            ],
                        },
                        {
                            path: 'specialities',
                            component: () => import('@/views/admin/specialities/Specialities.vue'),
                            redirect: 'all',
                            children: [
                                {
                                    path: 'all',
                                    component: () => import('@/views/admin/specialities/ListSpecialities.vue'),
                                },
                                {
                                    path: 'create',
                                    component: () => import('@/views/admin/specialities/CreateSpeciality.vue'),
                                },
                                {
                                    path: 'edit/:id',
                                    name: 'admin-specialities-edit',
                                    component: () => import('@/views/admin/specialities/EditSpeciality.vue'),
                                },
                            ],
                        },
                        {
                            path: 'groups',
                            component: () => import('@/views/admin/groups/Groups.vue'),
                            redirect: 'all',
                            children: [
                                {
                                    path: 'all',
                                    component: () => import('@/views/admin/groups/ListGroups.vue'),
                                },
                                {
                                    path: 'create',
                                    component: () => import('@/views/admin/groups/CreateGroup.vue'),
                                },
                                {
                                    path: 'edit/:id',
                                    name: 'admin-groups-edit',
                                    component: () => import('@/views/admin/groups/EditGroup.vue'),
                                },
                            ],
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
