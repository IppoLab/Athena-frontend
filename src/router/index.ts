import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: () => import('@/views/Start.vue'),
            children: [
                {
                    path: '/',
                    component: () => import('@/views/Profile.vue'),
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
                    redirect: 'admin/users',
                    children: [
                        {
                            path: 'settings',
                            component: () => import('@/views/admin/Settings.vue'),
                        },
                        {
                            path: 'users',
                            redirect: 'users/all',
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
                            redirect: 'subjects/all',
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
                            redirect: 'specialities/all',
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
                            redirect: 'groups/all',
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
                {
                    path: 'tutor',
                    component: () => import('@/views/tutor/Tutor.vue'),
                    redirect: 'tutor/tasks',
                    children: [
                        {
                            path: 'reports',
                            redirect: 'reports/all',
                        },
                        {
                            path: 'reports/all',
                            component: () => import('@/views/tutor/tasks/reports/ListReports.vue'),
                        },
                        {
                            path: 'reports/:id',
                            name: 'tutor-view-report',
                            component: () => import('@/views/tutor/tasks/reports/CheckReport.vue'),
                        },
                        {
                            path: 'tasks',
                            component: () => import('@/views/tutor/tasks/Tasks.vue'),
                            redirect: 'tasks/all',
                            children: [
                                {
                                    path: 'all',
                                    component: () => import('@/views/tutor/tasks/ListTasks.vue'),
                                },
                                {
                                    path: 'create',
                                    component: () => import('@/views/tutor/tasks/CreateTask.vue'),
                                },
                                {
                                    path: 'edit/:id',
                                    name: 'tutor-tasks-edit',
                                    component: () => import('@/views/tutor/tasks/EditTask.vue'),
                                },
                            ],
                        },
                    ],
                },
                {
                    path: 'student',
                    component: () => import('@/views/student/Student.vue'),
                    redirect: 'student/tasks',
                    children: [
                        {
                            path: 'reports',
                            component: () => import('@/views/student/tasks/reports/ListReports.vue'),
                        },
                        {
                            path: 'tasks',
                            component: () => import('@/views/student/tasks/Tasks.vue'),
                            redirect: 'tasks/all',
                            children: [
                                {
                                    path: 'all',
                                    component: () => import('@/views/student/tasks/ListTasks.vue'),
                                },
                                {
                                    path: ':id',
                                    name: 'student-view-task',
                                    component: () => import('@/views/student/tasks/ViewTask.vue'),
                                },
                                {
                                    path: ':id/report',
                                    component: () => import('@/views/student/tasks/reports/Reports.vue'),
                                    children: [
                                        {
                                            path: '',
                                            name: 'student-view-report',
                                            component: () => {
                                                return import('@/views/student/tasks/reports/ViewReport.vue');
                                            },
                                        },
                                        {
                                            path: 'new',
                                            name: 'student-new-report',
                                            component: () => {
                                                return import('@/views/student/tasks/reports/CreateReport.vue');
                                            },
                                        },
                                        {
                                            path: 'change',
                                            name: 'student-edit-report',
                                            component: () => {
                                                return import('@/views/student/tasks/reports/EditReport.vue');
                                            },
                                        },
                                    ],
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
