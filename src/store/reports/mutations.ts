import {getStoreAccessors} from 'typesafe-vuex';

import {IReport} from '@/models';
import {State} from '@/store/state';

import {ReportsState} from './state';


export const mutations = {
    setReports: (state: ReportsState, payload: IReport[]) => {
        state.reports = payload;
    },
    setReport: (state: ReportsState, payload: IReport) => {
        const reports = state.reports.filter((report: IReport) => report.id !== payload.id);
        reports.push(payload);
        state.reports = reports;
    },
};

const {commit} = getStoreAccessors<ReportsState, State>('');

export const commitSetReport = commit(mutations.setReport);
export const commitSetReports = commit(mutations.setReports);
