import {getStoreAccessors} from 'typesafe-vuex';
import {AdminState} from '@/store/admin/state';
import {State} from '@/store/state';
import {ActionContext} from 'vuex';
import {commitAddNotification} from '@/store/main/mutations';
import {dispatchCheckApiError} from '@/store/main/actions';
import {IUserInCreate} from '@/interfaces';

type MainContext = ActionContext<AdminState, State>;

export const actions = {
    actionCreateUser: async (context: MainContext, payload: IUserInCreate) => {
        try {
            const loadingNotification = {content: 'Создание пользователя', showProgress: true};
            commitAddNotification(context, loadingNotification);

            // commitRemoveNotification(context, loadingNotification);
            // commitAddNotification(context, { content: 'User successfully updated', color: 'success' });
        } catch (e) {
            await dispatchCheckApiError(context, e);
        }
    },
};

const {dispatch} = getStoreAccessors<AdminState, State>('');

export const dispatchCreateUser = dispatch(actions.actionCreateUser);
