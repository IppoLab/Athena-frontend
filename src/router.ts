import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "",
            name: "home",
            component: Home,
        },
        {
            path: "/login",
            name: "login",
            props: true,
            component: () => import("@/views/Login.vue"),
        },
        {
            path: "/add",
            name: "tasks",
            props: true,
            component: () => import("@/views/TaskManaging.vue"),
        },
        {
            path: "/check",
            name: "check",
            props: true,
            component: () => import("@/views/TaskChecking.vue"),
        },
        {
            path: "/reg",
            name: "reg",
            props: true,
            component: () => import("@/views/Registration.vue"),
        },
        {
            path: "/upload",
            name: "/upload",
            component: () => import("@/views/Upload.vue"),
        },
        {
            path: "/about",
            name: "about",
            component: () => import("./views/About.vue"),
        },
    ],
});
