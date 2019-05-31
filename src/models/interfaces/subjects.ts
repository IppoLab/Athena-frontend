export interface ISubjectBase {
    name: string;
    semester: number;
}

export interface IIdSubject extends ISubjectBase {
    id: string;
}

export interface ISubject extends IIdSubject {
}

export interface ISubjectInAPI extends ISubjectBase {
}

export interface ISubjectInResponse extends IIdSubject, ISubjectInAPI {
}

export interface ISubjectInCreate extends ISubjectInAPI {
}

export interface ISubjectInUpdate extends ISubjectInAPI {
}
