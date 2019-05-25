import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '',
            component: () => import('@/components/access/AuthGuard.vue'),
            children: [
                {
                    path: '',
                    name: 'home',
                    redirect: 'profile',
                },
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('@/views/Login.vue'),
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: () => import('@/views/Profile.vue'),
                },
                {
                    path: 'admin',
                    component: () => import('@/components/access/AdminGuard.vue'),
                    redirect: 'admin/users',
                    children: [
                        {
                            path: 'settings',
                            name: 'settings',
                            component: () => import('@/views/Settings.vue'),
                        },
                        {
                            path: 'users',
                            redirect: 'users/all',
                            component: () => import('@/components/RouterComponent.vue'),
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
                            component: () => import('@/components/RouterComponent.vue'),
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
                            component: () => import('@/components/RouterComponent.vue'),
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
                            component: () => import('@/components/RouterComponent.vue'),
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
                    component: () => import('@/components/RouterComponent.vue'),
                    children: [
                        {
                            path: 'all',
                            name: 'reports-all',
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
                    component: () => import('@/components/RouterComponent.vue'),
                    redirect: 'tasks/all',
                    children: [
                        {
                            path: 'all',
                            name: 'tasks-all',
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
            path: '/*',
            name: 'not-found',
            component: () => import('@/views/NotFound.vue'),
        },
    ],
});
