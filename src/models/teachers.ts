import {ISubject} from './subjects';

export interface ITeacherProfile {
    subjects: ISubject[];
}

export interface ITeacherProfileInAPI {
    subjects: string[];
}

export interface ITeacherProfileInUpdate extends ITeacherProfileInAPI {
}

export interface ITeacherProfileInResponse extends ITeacherProfileInAPI {
}


