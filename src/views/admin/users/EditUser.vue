<template>
    <v-container class="fluid">
        <v-card class="elevation-10">
            <v-toolbar>
                <v-toolbar-title primary-title>Изменение пользователя</v-toolbar-title>
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
                    Изменить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {IUserProfile} from '@/interfaces';
    import {readAdminUserById} from '@/store/admin/getters';
    import {dispatchChangeUserById, dispatchGetUserById, dispatchGetUsers} from '@/store/admin/actions';
    import {rolesRus} from '@/constants';

    @Component
    export default class EditUser extends Vue {
        public username: string = '';
        public firstName: string = '';
        public secondName: string = '';
        public lastName: string = '';
        public userRoles: string[] = [];
        public formError: string | boolean = false;
        public rolesFormError: string | boolean = false;

        public reset() {
            this.username = '';
            this.firstName = '';
            this.lastName = '';
            this.secondName = '';
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

        public async mounted() {
            this.reset();

            await dispatchGetUsers(this.$store);
            const user = readAdminUserById(this.$store)(this.$router.currentRoute.params.id);

            if (user) {
                this.username = user.username;
                this.firstName = user.firstName;
                this.secondName = user.secondName;
                this.lastName = user.lastName;
                this.userRoles = user.roles;
            }
        }


        public get fieldsAreValid() {
            let check: boolean = !!this.firstName && !!this.secondName && !!this.lastName;
            if (!this.userRoles.length) {
                check = false;
            }
            return check;
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
                await dispatchChangeUserById(this.$store, {
                    id: this.$router.currentRoute.params.id,
                    user: {
                        username: this.username,
                        firstName: this.firstName,
                        secondName: this.secondName,
                        lastName: this.lastName,
                        roles: this.userRoles,
                    },
                });
            }
        }
    }
</script>
