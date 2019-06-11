import Vue from 'vue';
import Router from 'vue-router';

import RouterComponent from '@/components/RouterComponent.vue';

import {adminRouteGuard, authRouteGuard, typeRouteGuard} from './guards';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '',
            component: RouterComponent,
            beforeEnter: authRouteGuard,
            children: [
                {
                    path: '',
                    name: 'home',
                    redirect: 'profile',
                },
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('@/views/common/Login.vue'),
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: () => import('@/views/common/Profile.vue'),
                },
                {
                    path: 'settings',
                    name: 'settings',
                    component: () => import('@/views/common/Settings.vue'),
                },
                {
                    path: 'admin',
                    component: RouterComponent,
                    beforeEnter: adminRouteGuard,
                    redirect: 'admin/users',
                    children: [
                        {
                            path: 'users',
                            redirect: 'users/all',
                            component: RouterComponent,
                            children: [
                                {
                                    path: 'all',
                                    name: 'users-all',
                                    component: () => import('@/views/users/ListUsers.vue'),
                                },
                                {
                                    path: 'new',
                                    name: 'users-new',
                                    component: () => import('@/views/users/CreateUser.vue'),
                                },
                                {
                                    path: ':id',
                                    name: 'users-view',
                                    component: () => import('@/views/users/ViewUser.vue'),
                                },
                                {
                                    path: ':id/edit',
                                    name: 'users-edit',
                                    component: () => import('@/views/users/EditUser.vue'),
                                },
                            ],
                        },
                        {
                            path: 'subjects',
                            component: RouterComponent,
                            redirect: 'subjects/all',
                            children: [
                                {
                                    path: 'all',
                                    name: 'subjects-all',
                                    component: () => import('@/views/subjects/ListSubjects.vue'),
                                },
                                {
                                    path: 'new',
                                    name: 'subjects-new',
                                    component: () => import('@/views/subjects/CreateSubject.vue'),
                                },
                                {
                                    path: ':id/edit',
                                    name: 'subjects-edit',
                                    component: () => import('@/views/subjects/EditSubject.vue'),
                                },
                            ],
                        },
                        {
                            path: 'specialities',
                            component: RouterComponent,
                            redirect: 'specialities/all',
                            children: [
                                {
                                    path: 'all',
                                    name: 'specialities-all',
                                    component: () => import('@/views/specialities/ListSpecialities.vue'),
                                },
                                {
                                    path: 'new',
                                    name: 'specialities-new',
                                    component: () => import('@/views/specialities/CreateSpeciality.vue'),
                                },
                                {
                                    path: ':id/edit',
                                    name: 'specialities-edit',
                                    component: () => import('@/views/specialities/EditSpeciality.vue'),
                                },
                            ],
                        },
                        {
                            path: 'groups',
                            component: RouterComponent,
                            redirect: 'groups/all',
                            children: [
                                {
                                    path: 'all',
                                    name: 'groups-all',
                                    component: () => import('@/views/groups/ListGroups.vue'),
                                },
                                {
                                    path: 'new',
                                    name: 'groups-new',
                                    component: () => import('@/views/groups/CreateGroup.vue'),
                                },
                                {
                                    path: ':id/edit',
                                    name: 'groups-edit',
                                    component: () => import('@/views/groups/EditGroup.vue'),
                                },
                            ],
                        },
                    ],
                },
                {
                    path: 'reports',
                    redirect: 'reports/all',
                    component: RouterComponent,
                    children: [
                        {
                            path: ':type/all',
                            name: 'reports-all',
                            beforeEnter: typeRouteGuard,
                            component: () => import('@/views/reports/ListReports.vue'),
                        },
                        {
                            path: ':id',
                            name: 'reports-view',
                            component: () => import('@/views/reports/ViewReport.vue'),
                        },
                        {
                            path: 'new',
                            name: 'reports-new',
                            component: () => import('@/views/reports/CreateReport.vue'),
                        },
                        {
                            path: 'change',
                            name: 'reports-edit',
                            component: () => import('@/views/reports/EditReport.vue'),
                        },
                    ],
                },
                {
                    path: 'tasks',
                    component: RouterComponent,
                    redirect: 'tasks/all',
                    children: [
                        {
                            path: ':type/all',
                            name: 'tasks-all',
                            beforeEnter: typeRouteGuard,
                            component: () => import('@/views/tasks/ListTasks.vue'),
                        },
                        {
                            path: 'new',
                            name: 'tasks-new',
                            component: () => import('@/views/tasks/CreateTask.vue'),
                        },
                        {
                            path: ':id',
                            name: 'tasks-view',
                            component: () => import('@/views/tasks/ViewTask.vue'),
                        },
                        {
                            path: ':id/edit',
                            name: 'tasks-edit',
                            component: () => import('@/views/tasks/EditTask.vue'),
                        },
                    ],
                },
            ],
        },
        {
            path: '/404',
            name: 'not-found',
            component: () => import('@/views/common/NotFound.vue'),
        },
        {
            path: '*',
            redirect: '/404',
        },
    ],
});
