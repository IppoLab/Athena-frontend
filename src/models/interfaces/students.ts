import {IGroup} from '@/models';

export interface IStudentProfileBase {
    cipher: string;
}


export interface IStudentProfile extends IStudentProfileBase {
    studentGroup: IGroup;
}

export interface IStudentProfileInAPI extends IStudentProfileBase {
    studentGroup: string;
}

export interface IStudentProfileInResponse extends IStudentProfileInAPI {
}


export interface IStudentProfileInUpdate extends IStudentProfileInAPI {
}
