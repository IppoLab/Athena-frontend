import {ITask} from './tasks';
import {IUserProfile} from './users';

export interface IReportBase {
    name: string;
    status: string;
    comment: string | null;
}

export interface IIdReport extends IReportBase {
    id: string;
}

export interface IReportWithDates extends IIdReport {
    createdAt: string;
    updatedAt: string;
    checkedAt: string;
}

export interface IReport extends IReportWithDates {
    file: string;
    attachment: string;
    task: ITask;
    student: IUserProfile;
    verifiedBy: IUserProfile;
}

export interface IReportInAPI extends IReportBase {
    task: string;
    student: string;
    verifiedBy: string;
}

export interface IReportInResponse extends IReportWithDates, IReportInAPI {
    file: string;
    attachment: string;
}

export interface IReportInCreate {
    name: string;
    task: string;
    student: string;
    file?: File;
    attachment?: File;
}

export interface IReportInUpdate {
    name: string;
    file?: File;
    attachment?: File;
}

export interface IReportInCheck {
    status: string;
    comment: string;
}
