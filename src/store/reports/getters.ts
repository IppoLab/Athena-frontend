import {getStoreAccessors} from 'typesafe-vuex';

import {State} from '@/store/state';

import {ReportsState} from './state';
import {IReport} from '@/models';


export const getters = {
    reports: (state: ReportsState) => state.reports,
    reportById: (state: ReportsState) => (reportId: string) => {
        const filteredReports = state.reports.filter((report: IReport) => report.id === reportId);
        if (filteredReports.length > 0) {
            return filteredReports[0];
        }
        return null;
    },
    readReportByTaskId: (state: ReportsState) => (studentId: string, taskId: string) => {
        const filteredReports = state.reports.filter(
            (report: IReport) => report.student.id === studentId && report.task.id === taskId,
        );
        if (filteredReports.length > 0) {
            return filteredReports[0];
        }
        return null;
    },
};

const {read} = getStoreAccessors<ReportsState, State>('');

export const readReportById = read(getters.reportById);
export const readReports = read(getters.reports);
export const readReportByTaskId = read(getters.readReportByTaskId);

