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
                                <v-checkbox v-model="userRoles" :label="role[1]" :value=role[0] v-for="role in roles"
                                            :key="role.id"/>
                            </v-layout>
                            <v-alert :value="rolesFormError" type="error" transition="fade-transition"
                                     v-if="rolesFormError">
                                {{rolesFormError }}
                            </v-alert>
                        </v-container>
                        <span v-if="isStudent">
                            <v-text-field
                                    v-model="studentCipher"
                                    label="Шифр"
                                    :rules="[() => !!studentCipher || 'Поле обязательно']"
                                    required
                                    type="text">
                            </v-text-field>
                            <v-combobox
                                    :items="groups"
                                    v-model="studentGroup"
                                    clearable
                                    item-text="name"
                                    label="Группа">
                        </v-combobox>
                        </span>
                        <span v-if="isTeacher">
                            <v-combobox
                                    :items="subjects"
                                    v-model="teacherSubjects"
                                    item-text="display"
                                    chips
                                    clearable
                                    label="Предметы"
                                    multiple>
                            </v-combobox>
                        </span>
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
    import {rolesRus, studentRoleName, teacherRoleName} from '@/configs/constants';
    import {dispatchGetSubjects} from '@/store/subjects/actions';
    import {dispatchCreateUser} from '@/store/users/actions';
    import {dispatchGetGroups} from '@/store/groups/actions';
    import {IGroup} from '@/models';
    import {readGroups} from '@/store/groups/getters';
    import {readSubjects} from '@/store/subjects/getters';
    import {ISubject} from '@/models/interfaces/subjects';

    @Component
    export default class CreateUser extends Vue {
        public username: string = '';

        public firstName: string = '';
        public secondName: string = '';
        public lastName: string = '';

        public password1: string = '';
        public password2: string = '';

        public userRoles: string[] = [];

        public studentCipher: string = '';
        public studentGroup: IGroup | null = null;

        public teacherSubjects: ISubject[] = [];

        public formError: string | boolean = false;
        public rolesFormError: string | boolean = false;

        public async mounted() {
            this.reset();
            await dispatchGetGroups(this.$store);
            await dispatchGetSubjects(this.$store);
        }

        public reset() {
            this.username = '';

            this.firstName = '';
            this.lastName = '';
            this.secondName = '';

            this.password1 = '';
            this.password2 = '';

            this.userRoles = [];

            this.studentCipher = '';
            this.studentGroup = null;

            this.teacherSubjects = [];

            this.formError = false;
            this.rolesFormError = false;
        }

        public cancel() {
            this.$router.back();
        }

        public get roles() {
            return rolesRus;
        }

        public get groups() {
            return readGroups(this.$store);
        }

        public get subjects() {
            return readSubjects(this.$store).map((subject: ISubject) => {
                return {
                    id: subject.id,
                    semester: subject.semester,
                    name: subject.name,
                    display: `${subject.name} (${subject.semester} семестр)`,
                };
            });
        }

        public get fieldsAreValid() {
            let check: boolean = !!this.username && !!this.firstName && !!this.secondName && !!this.lastName;
            check = check && !!this.password1 && !!this.password2 && this.password1 === this.password2;
            if (!this.userRoles.length) {
                check = false;
            }
            if (this.isStudent) {
                check = (
                    check &&
                    !!this.studentCipher &&
                    !!this.studentGroup &&
                    this.groups.findIndex((group: IGroup) => this.studentGroup!.id === group.id) !== -1
                );
            }
            if (this.isTeacher) {
                const subjects = this.subjects;

                check = (
                    check &&
                    !!this.teacherSubjects.length &&
                    !this.teacherSubjects.filter(
                        (subject: ISubject) => subjects.findIndex(
                            (loadedSubject) => subject.id === loadedSubject.id) === -1,
                    ).length
                );
            }
            return check;
        }

        public get isStudent() {
            return this.userRoles.includes(studentRoleName);
        }

        public get isTeacher() {
            return this.userRoles.includes(teacherRoleName);
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
                await dispatchCreateUser(this.$store, {
                    user: {
                        username: this.username,
                        password: this.password1,
                        firstName: this.firstName,
                        secondName: this.secondName,
                        lastName: this.lastName,
                        roles: this.userRoles,
                    },
                    student: {
                        cipher: this.studentCipher,
                        studentGroup: !!this.studentGroup ? this.studentGroup.id : '',
                    },
                    teacher: {
                        subjects: this.teacherSubjects.map((subject: ISubject) => subject.id),
                    },
                });
            }
        }
    }
</script>
