import {ISpeciality} from '@/models';

export interface IGroupBase {
    name: string;
}

export interface IIdGroup extends IGroupBase {
    id: string;
}

export interface IGroupInAPI extends IGroupBase {
    speciality: string;
}

export interface IGroupInResponse extends IIdGroup, IGroupInAPI {
}

export interface IGroup extends IIdGroup {
    speciality: ISpeciality | null;
}

export interface IGroupInCreate extends IGroupInAPI {
}

export interface IGroupInUpdate extends IGroupInAPI {
}
