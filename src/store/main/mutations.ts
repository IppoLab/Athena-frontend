import {MainState} from "./state";
import {getStoreAccessors} from "typesafe-vuex";
import {State} from "@/store/state";

export const mutations = {
    setToken: (state: MainState, payload: string) => {
        state.token = payload;
    },
    setLoggedIn: (state: MainState, payload: boolean) => {
        state.isLoggedIn = payload;
    },
    setLoginError: (state: MainState, payload: boolean) => {
        state.loginError = payload;
    },
};

const {commit} = getStoreAccessors<MainState | any, State>("");

export const commitSetToken = commit(mutations.setToken);
export const commitSetLoggedIn = commit(mutations.setLoggedIn);
export const commitSetLoginError = commit(mutations.setLoginError);
