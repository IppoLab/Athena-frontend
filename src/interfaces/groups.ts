import {ISpeciality} from '@/interfaces/specialities';

export interface IResponseGroup {
    id: string;
    name: string;
    speciality: string;
}

export interface IGroup {
    id: string;
    name: string;
    speciality: ISpeciality | null;
}

export interface IGroupInCreate {
    name: string;
    speciality: string;
}

export interface IGroupInUpdate {
    name?: string;
    speciality?: string;
}
