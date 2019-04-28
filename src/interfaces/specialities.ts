export interface ISpeciality {
    id: string;
    name: string;
    cipher: string;
}

export interface IDisplaySpeciality {
    id: string;
    name: string;
    cipher: string;
    display: string;
}

export interface ISpecialityInCreate {
    name: string;
    cipher: string;
}

export interface ISpecialityInUpdate {
    name?: string;
    cipher?: string;
}
