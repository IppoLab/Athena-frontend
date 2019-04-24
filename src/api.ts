/* tslint:disable:no-console */

import axios from 'axios';
import {apiUrl} from '@/env';
import {
    IGroupInCreate, IGroupInUpdate,
    ISpecialityInCreate,
    ISpecialityInUpdate,
    IUserInCreate,
    IUserInLogin,
    IUserInUpdate,
} from '@/interfaces';
import {env} from './env';
import {ISubjectInCreate, ISubjectInUpdate} from '@/interfaces/subject';

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


function authHeaders(token: string) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

const authApi = {
    loginGetToken: async (user: IUserInLogin) => {
        return axios.post(`${apiUrl}/auth/login/`, user);
    },
    refreshToken: async (token: string) => {
        return axios.post(`${apiUrl}/auth/login/refresh/`, {access: token}, authHeaders(token));
    },
    getMe: async (token: string) => {
        return axios.get(`${apiUrl}/auth/profile/me/`, authHeaders(token));
    },
};

const usersApi = {
    createUser: async (token: string, user: IUserInCreate) => {
        return axios.post(`${apiUrl}/auth/users/`, user, authHeaders(token));
    },
    getUserById: async (token: string, userId: string) => {
        return axios.get(`${apiUrl}/auth/users/${userId}`, authHeaders(token));
    },
    getUsers: async (token: string) => {
        return axios.get(`${apiUrl}/auth/users/`, authHeaders(token));
    },
    changeUserById: async (token: string, userId: string, user: IUserInUpdate) => {
        return axios.put(`${apiUrl}/auth/users/${userId}/`, user, authHeaders(token));
    },
};

const subjectsApi = {
    getSubjects: async (token: string) => {
        return axios.get(`${apiUrl}/edu/subjects/`, authHeaders(token));
    },
    createSubject: async (token: string, subject: ISubjectInCreate) => {
        return axios.post(`${apiUrl}/edu/subjects/`, subject, authHeaders(token));
    },
    getSubjectById: async (token: string, subjectId: string) => {
        return axios.get(`${apiUrl}/edu/subjects/${subjectId}/`, authHeaders(token));
    },
    changeSubjectById: async (token: string, subjectId: string, subject: ISubjectInUpdate) => {
        return axios.put(`${apiUrl}/edu/subjects/${subjectId}/`, subject, authHeaders(token));
    },
};

const specialitiesApi = {
    getSpecialities: async (token: string) => {
        return axios.get(`${apiUrl}/edu/specialities/`, authHeaders(token));
    },
    createSpeciality: async (token: string, speciality: ISpecialityInCreate) => {
        return axios.post(`${apiUrl}/edu/specialities/`, speciality, authHeaders(token));
    },
    changeSpecialityById: async (token: string, specialityId: string, speciality: ISpecialityInUpdate) => {
        return axios.put(`${apiUrl}/edu/specialities/${specialityId}/`, speciality, authHeaders(token));
    },
};

const groupsApi = {
    getGroups: async (token: string) => {
        return axios.get(`${apiUrl}/edu/student-groups/`, authHeaders(token));
    },
    createGroup: async (token: string, group: IGroupInCreate) => {
        return axios.post(`${apiUrl}/edu/student-groups/`, group, authHeaders(token));
    },
    changeGroupById: async (token: string, groupId: string, group: IGroupInUpdate) => {
        return axios.put(`${apiUrl}/edu/student-groups/${groupId}/`, group, authHeaders(token));
    },
};

export const api = {
    ...authApi,
    ...usersApi,
    ...subjectsApi,
    ...specialitiesApi,
    ...groupsApi,
};
