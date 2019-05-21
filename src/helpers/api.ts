/* tslint:disable:no-console */

import axios from 'axios';

import {apiUrl, env} from '@/configs/env';
import {
    IAuthResponse,
    IGroupInCreate,
    IGroupInResponse,
    IGroupInUpdate,
    IReportInCheck,
    IReportInCreate,
    IReportInResponse,
    IReportInUpdate,
    ISpecialityInCreate,
    ISpecialityInResponse,
    ISpecialityInUpdate,
    IStudentProfileInResponse,
    IStudentProfileInUpdate,
    ISubjectInCreate,
    ISubjectInResponse,
    ISubjectInUpdate,
    ITaskInCreate,
    ITaskInResponse,
    ITaskInUpdate,
    ITeacherProfileInAPI,
    ITeacherProfileInResponse,
    IUserInLogin,
    IUserProfileInCreate,
    IUserProfileInResponse,
    IUserProfileInUpdate,
} from '@/models';
import {getLocalApiUrl} from '@/helpers/app';

if (env !== 'production') {
    axios.interceptors.request.use((request) => {
        console.log('Request: ', request);
        return request;
    });

    axios.interceptors.response.use((response) => {
        console.log('Response: ', response);
        return response;
    });
}

export function setAxiosApiUrl(newUrl?: string) {
    if (newUrl) {
        axios.defaults.baseURL = newUrl;
    } else if (getLocalApiUrl()) {
        axios.defaults.baseURL = getLocalApiUrl();
    } else {
        axios.defaults.baseURL = apiUrl;
    }
}

setAxiosApiUrl();

export function setAxiosAuthToken(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function buildFormData<T>(object: T) {
    const data = new FormData();
    for (const key of Object.keys(object)) {
        if (object[key] === undefined) {
            continue;
        }

        data.append(key, object[key]);
    }
    return data;
}

const authApi = {
    loginGetToken: async (user: IUserInLogin) => {
        return axios.post<IAuthResponse>('/auth/login/', user);
    },
    verifyToken: async (token: string) => {
        return axios.post('/auth/token/verify/', {token});
    },
    refreshToken: async (refresh: string) => {
        return axios.post<IAuthResponse>('/auth/token/refresh/', {refresh});
    },
    getMe: async () => {
        return axios.get<IUserProfileInResponse>('/auth/profile/me/');
    },
};

const usersApi = {
    getUserProfiles: async () => {
        return axios.get<IUserProfileInResponse[]>(`/auth/users/`);
    },
    createUserProfile: async (user: IUserProfileInCreate) => {
        return axios.post<IUserProfileInResponse>('/auth/users/', user);
    },
    getUserProfileById: async (userId: string) => {
        return axios.get<IUserProfileInResponse>(`/auth/users/${userId}`);
    },
    changeUserProfileById: async (userId: string, user: IUserProfileInUpdate) => {
        return axios.put<IUserProfileInResponse>(`/auth/users/${userId}/`, user);
    },
    getStudentProfileById: async (studentId: string) => {
        return axios.get<IStudentProfileInResponse>(`/auth/students/${studentId}/`);
    },
    changeStudentProfileById: async (studentId: string, student: IStudentProfileInUpdate) => {
        return axios.put<IStudentProfileInResponse>(`/auth/students/${studentId}/`, student);
    },
    getTeacherProfileById: async (teacherId: string) => {
        return axios.get<ITeacherProfileInResponse>(`/auth/teachers/${teacherId}/`);
    },
    changeTeacherProfileById: async (teacherId: string, teacher: ITeacherProfileInAPI) => {
        return axios.put<ITeacherProfileInResponse>(`/auth/teachers/${teacherId}/`, teacher);
    },
};

const subjectsApi = {
    getSubjects: async () => {
        return axios.get<ISubjectInResponse[]>('/edu/subjects/');
    },
    createSubject: async (subject: ISubjectInCreate) => {
        return axios.post<ISubjectInResponse>('/edu/subjects/', subject);
    },
    getSubjectById: async (subjectId: string) => {
        return axios.get<ISubjectInResponse>(`/edu/subjects/${subjectId}/`);
    },
    changeSubjectById: async (subjectId: string, subject: ISubjectInUpdate) => {
        return axios.put<ISubjectInResponse>(`/edu/subjects/${subjectId}/`, subject);
    },
};

const specialitiesApi = {
    getSpecialities: async () => {
        return axios.get<ISpecialityInResponse[]>('/edu/specialities/');
    },
    createSpeciality: async (speciality: ISpecialityInCreate) => {
        return axios.post<ISpecialityInResponse>('/edu/specialities/', speciality);
    },
    getSpecialityById: async (specialityId: string) => {
        return axios.get<ISpecialityInResponse>(`/edu/specialities/${specialityId}/`);
    },
    changeSpecialityById: async (specialityId: string, speciality: ISpecialityInUpdate) => {
        return axios.put<ISpecialityInResponse>(`/edu/specialities/${specialityId}/`, speciality);
    },
};

const groupsApi = {
    getGroups: async () => {
        return axios.get<IGroupInResponse[]>(`/edu/student-groups/`);
    },
    createGroup: async (group: IGroupInCreate) => {
        return axios.post<IGroupInResponse>(`/edu/student-groups/`, group);
    },
    getGroupById: async (groupId: string) => {
        return axios.get<IGroupInResponse>(`/edu/student-groups/${groupId}`);
    },
    changeGroupById: async (groupId: string, group: IGroupInUpdate) => {
        return axios.put<IGroupInResponse>(`/edu/student-groups/${groupId}/`, group);
    },
};

const tasksApi = {
    getTasks: async () => {
        return axios.get<ITaskInResponse[]>('/works/tasks/');
    },
    createTask: async (task: ITaskInCreate) => {
        return axios.post<ITaskInResponse>('/works/tasks/', buildFormData(task), {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getTaskById: async (taskId: string) => {
        return axios.get<ITaskInResponse>(`/works/tasks/${taskId}/`);
    },
    updateTaskById: async (taskId: string, task: ITaskInUpdate) => {
        return axios.patch<ITaskInResponse>(`/works/tasks/${taskId}/`, buildFormData(task), {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

const reportsApi = {
    getStudentReportForTask: async (taskId: string) => {
        return axios.get<IReportInResponse>(`/works/tasks/${taskId}/report/`);
    },
    getReportById: async (reportId: string) => {
        return axios.get<IReportInResponse>(`works/reports/${reportId}/`);
    },
    createReport: async (report: IReportInCreate) => {
        return axios.post<IReportInResponse>('/works/reports/', buildFormData(report));
    },
    updateReportById: async (reportId: string, report: IReportInUpdate) => {
        return axios.patch<IReportInResponse>(`works/reports/${reportId}/`, buildFormData(report));
    },
    getReports: async () => {
        return axios.get<IReportInResponse[]>('works/reports/');
    },
    checkReport: async (reportId: string, report) => {
        return axios.put<IReportInCheck>(`works/reports/${reportId}/`, report);
    },
};

export const api = {
    ...authApi,
    ...usersApi,
    ...subjectsApi,
    ...specialitiesApi,
    ...groupsApi,
    ...tasksApi,
    ...reportsApi,
};
