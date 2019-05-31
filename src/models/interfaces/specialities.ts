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

