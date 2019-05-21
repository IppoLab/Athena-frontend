export interface ISubjectBase {
    name: string;
    semester: number;
}

export interface IIdSubject extends ISubjectBase {
    id: string;
}

export interface ISubject extends IIdSubject {
}

export interface ISubjectInSelect extends ISubject {
    display: string | null;
}

export interface ISubjectInAPI extends ISubjectBase {
}

export interface ISubjectInResponse extends IIdSubject, ISubjectInAPI {
}

export interface ISubjectInCreate extends ISubjectInAPI {
}

export interface ISubjectInUpdate extends ISubjectInAPI {
}

export class ListElementSubject implements ISubject {
    public id!: string;
    public name!: string;
    public semester!: number;

    public constructor({id, name, semester}: ISubject) {
        this.id = id;
        this.name = name;
        this.semester = semester;
    }

    public get display() {
        return `${this.name} (${this.semester})`;
    }
}
