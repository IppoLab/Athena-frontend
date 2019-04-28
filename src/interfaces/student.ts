import {IGroup} from './groups';

export interface IStudentProfile {
    cipher: string;
    studentGroup: IGroup;
}

export interface IStudentProfileInUpdate {
    cipher: string;
    studentGroup: string;
}
