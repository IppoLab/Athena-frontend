import {api} from "@/api";
import {removeLocalToken, saveLocalToken} from "@/utils";
import {getStoreAccessors} from "typesafe-vuex";
import {ActionContext} from "vuex";
import {State} from "@/store/state";
import {MainState} from "@/store/main/state";
import {IUserInLogin} from "@/interfaces";
import {commitSetLoggedIn, commitSetLoginError, commitSetToken} from "@/store/main/mutations";
import router from "@/router";

type MainContext = ActionContext<MainState, State>;

export const actions = {
    actionLogin: async (context: MainContext, payload: IUserInLogin) => {
        try {
            const response = await api.loginGetToken(payload);
            const token = response.data.token;
            if (token) {
                saveLocalToken(token);
                commitSetToken(context, token);
                commitSetLoggedIn(context, true);
                commitSetLoginError(context, false);
                await dispatchRouteLoggedIn(context);
            } else {
                await dispatchLogout(context);
            }
        } catch (e) {
            commitSetLoginError(context, true);
            await dispatchLogout(context);
        }
    },
    actionRemoveLogin: async (context: MainContext) => {
        removeLocalToken();
        commitSetToken(context, "");
        commitSetLoginError(context, false);
    },
    actionLogout: async (context: MainContext) => {
        await dispatchRemoveLogin(context);
    },
    actionRouteLoggedIn: (context: MainContext) => {
        if (router.currentRoute.path === "/login") {
            router.push("/upload");
        }
    },
};

const {dispatch} = getStoreAccessors<MainState | any, State>("");

export const dispatchRemoveLogin = dispatch(actions.actionRemoveLogin);
export const dispatchLogout = dispatch(actions.actionLogout);
export const dispatchLogin = dispatch(actions.actionLogin);
export const dispatchRouteLoggedIn = dispatch(actions.actionRouteLoggedIn);
