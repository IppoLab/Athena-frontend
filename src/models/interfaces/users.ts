import {IStudentProfile, ITeacherProfile} from '@/models';

export interface IUserInLogin {
    username: string;
    password: string;
}

export interface IUserProfileBase {
    username: string;
    firstName: string;
    secondName: string;
    lastName: string;
    roles: string[];
}

export interface IUserProfileInResponse extends IUserProfileBase {
    id: string;
}

export interface IUserProfile extends IUserProfileInResponse {
    studentProfile?: IStudentProfile;
    teacherProfile?: ITeacherProfile;
}

export interface IUserProfileInCreate extends IUserProfileBase {
    password: string;
}

export interface IUserProfileInUpdate extends IUserProfileBase {
}
