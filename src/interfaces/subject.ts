export interface ISubject {
    id: string;
    name: string;
    semester: number;
}

export interface ISubjectInCreate {
    name: string;
    semester: number;
}

export interface ISubjectInUpdate {
    name?: string;
    semester?: number;
}
