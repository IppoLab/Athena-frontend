import {ISubject} from './subjects';
import {IGroup} from './groups';

export interface ITaskBase {
    name: string;
    description: string;
    deadline: string;
}

export interface IIdTask extends ITaskBase {
    id: string;
}

export interface ITask extends IIdTask {
    subject: ISubject;
    studentGroup: IGroup;
    file: string | null;
    attachment: string | null;
}


export interface ITaskInAPI extends ITaskBase {
    subject: string;
    studentGroup: string;
}

export interface ITaskInResponse extends IIdTask, ITaskInAPI {
    file: string | null;
    attachment: string | null;
}

export interface ITaskInRequest extends ITaskInAPI {
    file?: File;
    attachment?: File;
}


export interface ITaskInCreate extends ITaskInRequest {
}

export interface ITaskInUpdate extends ITaskInRequest {
}
