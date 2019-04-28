import {IStudentProfile} from './student';
import {ITeacherProfile} from './teacher';

export interface IUserInLogin {
    username: string;
    password: string;
}

export interface IUserProfile {
    id: string;
    username: string;
    firstName: string;
    secondName: string;
    lastName: string;
    roles: string[];
    studentProfile?: IStudentProfile;
    teacherProfile?: ITeacherProfile;
}

export interface IUserInCreate {
    username: string;
    password: string;
    firstName: string;
    secondName: string;
    lastName: string;
    roles: string[];
}

export interface IUserInUpdate {
    username?: string;
    firstName?: string;
    secondName?: string;
    lastName?: string;
    roles?: string[];
}

