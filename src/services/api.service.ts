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

import {getLocalApiUrl} from './local-storage.service';

const axiosInstance = axios.create({
    baseURL: apiUrl,
});

if (env !== 'production') {
    axiosInstance.interceptors.request.use((request) => {
        console.log('Request: ', request);
        return request;
    });

    axiosInstance.interceptors.response.use((response) => {
        console.log('Response: ', response);
        return response;
    });
}

export function setAxiosApiUrl(newUrl?: string) {
    if (newUrl) {
        axiosInstance.defaults.baseURL = newUrl;
    } else if (getLocalApiUrl()) {
        axiosInstance.defaults.baseURL = getLocalApiUrl();
    } else {
        axiosInstance.defaults.baseURL = apiUrl;
    }
}

setAxiosApiUrl();

export function setAxiosAuthToken(token: string) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    axiosInstance.defaults.headers.common['X-Athena-Authorization'] = `Bearer ${token}`; // for safari-based browsers
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
        return axiosInstance.post<IAuthResponse>('/auth/login/', user);
    },
    verifyToken: async (token: string) => {
        return axiosInstance.post('/auth/token/verify/', {token});
    },
    refreshToken: async (refresh: string) => {
        return axiosInstance.post<IAuthResponse>('/auth/token/refresh/', {refresh});
    },
    getMe: async () => {
        return axiosInstance.get<IUserProfileInResponse>('/auth/profile/me/');
    },
};

const usersApi = {
    getUserProfiles: async () => {
        return axiosInstance.get<IUserProfileInResponse[]>(`/auth/users/`);
    },
    createUserProfile: async (user: IUserProfileInCreate) => {
        return axiosInstance.post<IUserProfileInResponse>('/auth/users/', user);
    },
    getUserProfileById: async (userId: string) => {
        return axiosInstance.get<IUserProfileInResponse>(`/auth/users/${userId}`);
    },
    changeUserProfileById: async (userId: string, user: IUserProfileInUpdate) => {
        return axiosInstance.put<IUserProfileInResponse>(`/auth/users/${userId}/`, user);
    },
    getStudentProfileById: async (studentId: string) => {
        return axiosInstance.get<IStudentProfileInResponse>(`/auth/students/${studentId}/`);
    },
    changeStudentProfileById: async (studentId: string, student: IStudentProfileInUpdate) => {
        return axiosInstance.put<IStudentProfileInResponse>(`/auth/students/${studentId}/`, student);
    },
    getTeacherProfileById: async (teacherId: string) => {
        return axiosInstance.get<ITeacherProfileInResponse>(`/auth/teachers/${teacherId}/`);
    },
    changeTeacherProfileById: async (teacherId: string, teacher: ITeacherProfileInAPI) => {
        return axiosInstance.put<ITeacherProfileInResponse>(`/auth/teachers/${teacherId}/`, teacher);
    },
};

const subjectsApi = {
    getSubjects: async () => {
        return axiosInstance.get<ISubjectInResponse[]>('/edu/subjects/');
    },
    createSubject: async (subject: ISubjectInCreate) => {
        return axiosInstance.post<ISubjectInResponse>('/edu/subjects/', subject);
    },
    getSubjectById: async (subjectId: string) => {
        return axiosInstance.get<ISubjectInResponse>(`/edu/subjects/${subjectId}/`);
    },
    changeSubjectById: async (subjectId: string, subject: ISubjectInUpdate) => {
        return axiosInstance.put<ISubjectInResponse>(`/edu/subjects/${subjectId}/`, subject);
    },
};

const specialitiesApi = {
    getSpecialities: async () => {
        return axiosInstance.get<ISpecialityInResponse[]>('/edu/specialities/');
    },
    createSpeciality: async (speciality: ISpecialityInCreate) => {
        return axiosInstance.post<ISpecialityInResponse>('/edu/specialities/', speciality);
    },
    getSpecialityById: async (specialityId: string) => {
        return axiosInstance.get<ISpecialityInResponse>(`/edu/specialities/${specialityId}/`);
    },
    changeSpecialityById: async (specialityId: string, speciality: ISpecialityInUpdate) => {
        return axiosInstance.put<ISpecialityInResponse>(`/edu/specialities/${specialityId}/`, speciality);
    },
};

const groupsApi = {
    getGroups: async () => {
        return axiosInstance.get<IGroupInResponse[]>(`/edu/student-groups/`);
    },
    createGroup: async (group: IGroupInCreate) => {
        return axiosInstance.post<IGroupInResponse>(`/edu/student-groups/`, group);
    },
    getGroupById: async (groupId: string) => {
        return axiosInstance.get<IGroupInResponse>(`/edu/student-groups/${groupId}`);
    },
    changeGroupById: async (groupId: string, group: IGroupInUpdate) => {
        return axiosInstance.put<IGroupInResponse>(`/edu/student-groups/${groupId}/`, group);
    },
};

const tasksApi = {
    getTasks: async () => {
        return axiosInstance.get<ITaskInResponse[]>('/works/tasks/');
    },
    createTask: async (task: ITaskInCreate) => {
        return axiosInstance.post<ITaskInResponse>('/works/tasks/', buildFormData(task), {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getTaskById: async (taskId: string) => {
        return axiosInstance.get<ITaskInResponse>(`/works/tasks/${taskId}/`);
    },
    updateTaskById: async (taskId: string, task: ITaskInUpdate) => {
        return axiosInstance.patch<ITaskInResponse>(`/works/tasks/${taskId}/`, buildFormData(task), {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

const reportsApi = {
    getStudentReportForTask: async (taskId: string) => {
        return axiosInstance.get<IReportInResponse>(`/works/tasks/${taskId}/report/`);
    },
    getReportById: async (reportId: string) => {
        return axiosInstance.get<IReportInResponse>(`works/reports/${reportId}/`);
    },
    createReport: async (report: IReportInCreate) => {
        return axiosInstance.post<IReportInResponse>('/works/reports/', buildFormData(report));
    },
    updateReportById: async (reportId: string, report: IReportInUpdate) => {
        return axiosInstance.patch<IReportInResponse>(`works/reports/${reportId}/`, buildFormData(report));
    },
    getReports: async () => {
        return axiosInstance.get<IReportInResponse[]>('works/reports/');
    },
    checkReport: async (reportId: string, report) => {
        return axiosInstance.put<IReportInCheck>(`works/reports/${reportId}/`, report);
    },
};

export const apiService = {
    ...authApi,
    ...usersApi,
    ...subjectsApi,
    ...specialitiesApi,
    ...groupsApi,
    ...tasksApi,
    ...reportsApi,
};
