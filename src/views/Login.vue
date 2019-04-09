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
                                        v-model="username"
                                        label="Номер студенческого"
                                        :rules="[() => !!username || 'Поле обязательно']"
                                        required
                                        type="text">
                                </v-text-field>
                                <v-text-field
                                        @keyup.enter="submit"
                                        v-model="password"
                                        label="Пароль"
                                        :rules="[() => !!username || 'Поле обязательно']"
                                        required
                                        type="password">
                                </v-text-field>
                            </v-form>
                            <div v-if="loginError">
                                <v-alert :value="loginError" type="error" transition="fade-transition">
                                    Неправильный номер студенческого билета или пароль
                                </v-alert>
                            </div>
                            <div v-if="formError">
                                <v-alert :value="formError" type="error" transition="fade-transition">
                                    {{formError}}
                                </v-alert>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="submit">Войти</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {dispatchLogin} from '@/store/main/actions';
    import {readLoginError} from '@/store/main/getters';

    @Component
    export default class Login extends Vue {
        public username: string = '';
        public password: string = '';
        public formError: string | boolean = false;

        public get loginError() {
            return readLoginError(this.$store);
        }

        private get fieldsAreValid() {
            return this.username && this.password;
        }

        public async submit() {
            this.formError = false;

            if (!this.fieldsAreValid) {
                this.formError = 'Заполните обязательные поля';
            } else {
                await dispatchLogin(this.$store, {username: this.username, password: this.password});
            }
        }
    }
</script>

