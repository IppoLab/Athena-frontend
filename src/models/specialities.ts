export interface ISpecialityBase {
    name: string;
    cipher: string;
}

export interface IIdSpeciality extends ISpecialityBase {
    id: string;
}

export interface ISpeciality extends IIdSpeciality {
}

export interface ISpecialityInAPI extends ISpecialityBase {
}

export interface ISpecialityInResponse extends ISpecialityInAPI {
    id: string;
}

export interface ISpecialityInCreate extends ISpecialityInAPI {
}

export interface ISpecialityInUpdate extends ISpecialityInAPI {
}


export class ListElementSpeciality implements ISpeciality {
    public id!: string;
    public name!: string;
    public cipher!: string;

    public constructor({id, name, cipher}: ISpeciality) {
        this.id = id;
        this.name = name;
        this.cipher = cipher;
    }

    public get display() {
        return `${this.cipher} ${this.name}`;
    }
}
