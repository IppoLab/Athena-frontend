<template>
    <v-container class="fluid">
        <v-card class="elevation-10">
            <v-toolbar>
                <v-toolbar-title primary-title>Создание пользователя</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <template>
                    <v-form lazy-validation>
                        <v-text-field
                                v-model="username"
                                label="Имя пользователя"
                                :rules="[() => !!username || 'Поле обязательно']"
                                required
                                type="text">
                        </v-text-field>
                        <v-text-field
                                v-model="secondName"
                                label="Фамилия"
                                :rules="[() => !!secondName || 'Поле обязательно']"
                                required
                                type="text">
                        </v-text-field>
                        <v-text-field
                                v-model="firstName"
                                label="Имя"
                                :rules="[() => !!firstName || 'Поле обязательно']"
                                required
                                type="text">
                        </v-text-field>
                        <v-text-field
                                v-model="lastName"
                                label="Отчество"
                                :rules="[() => !!lastName || 'Поле обязательно']"
                                required
                                type="text">
                        </v-text-field>
                        <v-container class="fluid">
                            <v-layout row wrap>
                                <v-checkbox v-model="userRoles" :label="role[1]" :value=role[0] v-for="role in roles"  :key="role.id"/>
                            </v-layout>
                            <v-alert :value="rolesFormError" type="error" transition="fade-transition"
                                     v-if="rolesFormError">
                                {{rolesFormError }}
                            </v-alert>
                        </v-container>
                        <v-text-field v-model="studentGroup" v-if="newUserIsStudent" label="Шифр студента"
                                      :rules="[() => !!studentGroup || 'Поле обязательно для пользователей, являющихся студентами']"></v-text-field>
                        <v-layout align-center>
                            <v-flex>
                                <v-text-field
                                        type="password"
                                        ref="password"
                                        label="Пароль"
                                        v-model="password1"
                                        :rules="[() => !!password1 || 'Поле обязательно']"
                                        required>
                                </v-text-field>
                                <v-text-field
                                        type="password"
                                        label="Повторите пароль"
                                        v-model="password2"
                                        :rules="[() => !!password2 || 'Поле обязательно', () => password1 === password2 || 'Пароли не совпадают']"
                                        required>
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-form>
                    <v-alert :value="formError" type="error" transition="fade-transition" v-if="formError">
                        {{formError}}
                    </v-alert>
                </template>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cancel">Назад</v-btn>
                <v-btn @click="reset">Очистить</v-btn>
                <v-btn @click="submit" :disabled="!fieldsAreValid">
                    Создать
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {rolesRus, studentRoleName} from '@/constants';
    import {dispatchCreateUser} from '@/store/admin/actions';

    @Component
    export default class CreateUser extends Vue {
        public username: string = '';
        public firstName: string = '';
        public secondName: string = '';
        public lastName: string = '';
        public password1: string = '';
        public password2: string = '';
        public studentGroup: string = '';
        public userRoles: string[] = [];
        public formError: string | boolean = false;
        public rolesFormError: string | boolean = false;

        public async mounted() {
            this.reset();
        }

        public reset() {
            this.username = '';
            this.firstName = '';
            this.lastName = '';
            this.secondName = '';
            this.password1 = '';
            this.password2 = '';
            this.formError = false;
            this.userRoles = [];
            this.rolesFormError = false;
        }

        public cancel() {
            this.$router.back();
        }

        public get roles() {
            return rolesRus;
        }

        public get fieldsAreValid() {
            let check: boolean = !!this.firstName && !!this.secondName && !!this.lastName;
            check = check && !!this.password1 && !!this.password2 && this.password1 === this.password2;
            if (!this.userRoles.length) {
                check = false;
            }
            if (this.newUserIsStudent) {
                check = check && !!this.studentGroup;
            }
            return check;
        }

        public get newUserIsStudent() {
            return this.userRoles.includes(studentRoleName);
        }

        public async submit() {
            this.formError = false;
            this.rolesFormError = false;

            if (!this.fieldsAreValid) {
                this.formError = 'Проверьте обязательные поля';
                if (!this.userRoles.length) {
                    this.rolesFormError = 'У пользователя должен быть хотя бы один тип';
                }
            } else {
                dispatchCreateUser(this.$store, {
                    username: this.username,
                    password: this.password1,
                    firstName: this.firstName,
                    secondName: this.secondName,
                    lastName: this.lastName,
                    roles: this.userRoles,
                });
            }
        }
    }
</script>
