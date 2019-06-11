import {ActionContext} from 'vuex';
import {getStoreAccessors} from 'typesafe-vuex';

import router from '@/router';
import {State} from '@/store/state';

import {ReportsState} from './state';
import {apiService, loaders} from '@/services';
import {IReportInCheck, IReportInCreate, IReportInUpdate} from '@/models';
import {dispatchCheckApiError} from '@/store/app/actions';
import {commitAddNotification, commitRemoveNotification} from '@/store/app/mutations';
import {commitSetReport, commitSetReports} from '@/store/reports/mutations';

type ReportsContext = ActionContext<ReportsState | any, State>;

export const actions = {
    actionRouteReportCreateOrView: async (context: ReportsContext, payload: string) => {
        try {
            await apiService.getStudentReportForTask(payload);
            await dispatchRouteReportView(context, payload);
        } catch (e) {
            await dispatchRouteReportCreate(context, payload);
        }
    },
    actionRouteReportEdit: async (context: ReportsContext, payload: string) => {
        router.push({name: 'reports-edit', params: {id: payload}});
    },
    actionRouteReportCreate: async (context: ReportsContext, payload: string) => {
        router.push({name: 'reports-new', params: {id: payload}});
    },
    actionRouteReportView: async (context: ReportsContext, payload: string) => {
        router.push({name: 'reports-view', params: {id: payload}});
    },
    actionCreateReport: async (context: ReportsContext, payload: IReportInCreate) => {
        try {
            const loadingNotification = {content: 'Создание отчета', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = (await apiService.createReport(payload)).data;

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Отчет создан', color: 'success'});

            await dispatchRouteReportEdit(context, response.task);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionGetReportByTaskId: async (context: ReportsContext, payload: string) => {
        try {
            commitSetReport(context, await loaders.loadReportByTaskId(payload));
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionGetReportById: async (context: ReportsContext, payload: string) => {
        try {
            commitSetReport(context, await loaders.loadReportById(payload));
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionChangeReportById: async (context: ReportsContext, payload: { id: string, report: IReportInUpdate }) => {
        try {
            const loadingNotification = {content: 'Изменение отчета', showProgress: true};
            commitAddNotification(context, loadingNotification);

            const response = (await apiService.updateReportById(payload.id, payload.report)).data;

            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Отчет изменен', color: 'success'});

            await dispatchRouteReportEdit(context, response.task);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionGetReports: async (context: ReportsContext) => {
        try {
            commitSetReports(context, await loaders.loadAllReports());
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
    actionCheckReport: async (context: ReportsContext, payload: {
        id: string,
        report: IReportInCheck,
    }) => {
        try {
            await apiService.checkReport(payload.id, payload.report);
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
};

const {dispatch} = getStoreAccessors<ReportsState, State>('');

export const dispatchRouteReportCreateOrEdit = dispatch(actions.actionRouteReportCreateOrView);
export const dispatchRouteReportEdit = dispatch(actions.actionRouteReportEdit);
export const dispatchRouteReportView = dispatch(actions.actionRouteReportView);
export const dispatchRouteReportCreate = dispatch(actions.actionRouteReportCreate);
export const dispatchCreateReport = dispatch(actions.actionCreateReport);
export const dispatchGetReportByTaskId = dispatch(actions.actionGetReportByTaskId);
export const dispatchGetReportById = dispatch(actions.actionGetReportById);
export const dispatchChangeReportById = dispatch(actions.actionChangeReportById);
export const dispatchGetReports = dispatch(actions.actionGetReports);
export const dispatchCheckReport = dispatch(actions.actionCheckReport);
