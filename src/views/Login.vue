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
                                        label="Имя пользователя"
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
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="submit" :disabled="!fieldsAreValid">Войти</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {dispatchLogin} from '@/store/auth/actions';

    @Component
    export default class Login extends Vue {
        public username: string = '';
        public password: string = '';

        private get fieldsAreValid() {
            return this.username && this.password;
        }

        public async submit() {
            await dispatchLogin(this.$store, {username: this.username, password: this.password});
        }
    }
</script>

