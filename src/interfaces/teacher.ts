import {ISubject} from './subject';

export interface ITeacherProfile {
    subjects: ISubject[];
}

export interface ITeacherProfileInAPI {
    subjects: string[];
}


