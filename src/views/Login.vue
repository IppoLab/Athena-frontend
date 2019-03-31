<template>
    <v-content>
        <v-container class="fluid fill-height">
            <v-layout class="align-center justify-center">
                <v-flex class="xs12 md4 sm8">
                    <v-card class="elevation-10">
                        <v-toolbar>
                            <v-toolbar-title>Вход в систему</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                            <v-form @keyup.enter="submit">
                                <v-text-field
                                        @keyup.enter="submit"
                                        label="Номер студенческого"
                                        outline
                                        type="text"
                                        v-model="username">
                                </v-text-field>
                                <v-text-field
                                        @keyup.enter="submit"
                                        label="Пароль"
                                        outline
                                        type="password"
                                        v-model="password">
                                </v-text-field>
                            </v-form>
                            <div v-if="loginError">
                                <v-alert :value="loginError" type="error">
                                    Неправильный номер студенческого билета или пароль
                                </v-alert>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click.prevent="submit">Войти</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {dispatchLogin} from "@/store/main/actions";
    import {readLoginError} from "@/store/main/getters";

    @Component
    export default class Login extends Vue {
        public username: string = "";
        public password: string = "";

        public get loginError() {
            return readLoginError(this.$store);
        }

        public submit() {
            dispatchLogin(this.$store, {username: this.username, password: this.password});
        }
    }
</script>

