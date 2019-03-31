import {MainState} from "@/store/main/state";
import {State} from "@/store/state";
import {getStoreAccessors} from "typesafe-vuex";

export const getters = {
    loginError: (state: MainState) => state.loginError,
    token: (state: MainState) => state.token,
    isLoggedIn: (state: MainState) => state.isLoggedIn,
};

const {read} = getStoreAccessors<MainState, State>("");

export const readIsLoggedIn = read(getters.isLoggedIn);
export const readToken = read(getters.token);
export const readLoginError = read(getters.loginError);
