<template>
    <Loader :loading="!loaded">
        <v-container slot="content" class="fluid">
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
                                    label="Предметы"
                                    item-text="display"
                                    chips
                                    clearable
                                    multiple>
                            </v-combobox>
                        </span>
                        </v-form>
                        <v-alert :value="formError" type="error" transition="fade-transition" v-if="formError">
                            {{formError}}
                        </v-alert>
                    </template>
                </v-card-text>
                <v-card-actions>
                    <v-layout row wrap>
                        <v-btn :disabled="true" class="my-1">Сбросить пароль</v-btn>
                        <v-btn :disabled="true" class="my-1">
                            Заблокировать
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn @click="cancel" class="my-1">Назад</v-btn>
                        <v-btn @click="reset" class="my-1">Очистить</v-btn>
                        <v-btn @click="submit" :disabled="!fieldsAreValid" class="my-1">
                            Изменить
                        </v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-container>
    </Loader>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {IGroup} from '@/models';
    import {readSubjects} from '@/store/subjects/getters';
    import {readGroups} from '@/store/groups/getters';
    import {readUserProfileById} from '@/store/users/getters';
    import {
        dispatchChangeUserById,
        dispatchGetUserById,
    } from '@/store/users/actions';
    import {dispatchGetGroups} from '@/store/groups/actions';
    import {dispatchGetSubjects} from '@/store/subjects/actions';
    import {rolesRus, studentRoleName, teacherRoleName} from '@/configs/constants';
    import {ISubject, ISubjectInSelect} from '@/models/subjects';
    import {dispatchRouteNotFound} from '@/store/app/actions';
    import Loader from '@/components/Loader.vue';
    @Component({
        components: {Loader},
    })
    export default class EditUser extends Vue {
        public username: string = '';

        public firstName: string = '';
        public secondName: string = '';
        public lastName: string = '';

        public userRoles: string[] = [];

        public studentCipher: string = '';
        public studentGroup: IGroup | null = null;

        public teacherSubjects: ISubjectInSelect[] = [];

        public formError: string | boolean = false;
        public rolesFormError: string | boolean = false;
        public loaded: boolean = false;

        public reset() {
            this.username = '';

            this.firstName = '';
            this.lastName = '';
            this.secondName = '';

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

        public async mounted() {
            this.reset();

            await dispatchGetGroups(this.$store);
            await dispatchGetSubjects(this.$store);
            await dispatchGetUserById(this.$store, this.$router.currentRoute.params.id);


            const user = readUserProfileById(this.$store)(this.$router.currentRoute.params.id);

            if (user) {
                this.username = user.username;
                this.firstName = user.firstName;
                this.secondName = user.secondName;
                this.lastName = user.lastName;
                this.userRoles = user.roles;

                if (this.isStudent) {
                    this.studentCipher = user.studentProfile!.cipher;
                    this.studentGroup = user.studentProfile!.studentGroup;
                }

                if (this.isTeacher) {
                    this.teacherSubjects = user.teacherProfile!.subjects.map((subject: ISubject) => {
                        return {
                            id: subject.id,
                            name: subject.name,
                            semester: subject.semester,
                            display: `${subject.name} (${subject.semester} семестр)`,
                        };
                    });
                }
            } else {
                await dispatchRouteNotFound(this.$store);
            }

            this.loaded = true;
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

        public get isStudent() {
            return this.userRoles.includes(studentRoleName);
        }

        public get isTeacher() {
            return this.userRoles.includes(teacherRoleName);
        }

        public get fieldsAreValid() {
            let check: boolean = !!this.username && !!this.firstName && !!this.secondName && !!this.lastName;
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
