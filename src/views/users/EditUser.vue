<template>
    <loader :loading="!loaded">
        <v-container slot="content" class="fluid">
            <v-card class="elevation-10">
                <v-toolbar>
                    <v-toolbar-title primary-title>Изменение пользователя</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <template>
                        <v-form ref="form" lazy-validation>
                            <v-text-field
                                    v-model="userForm.username"

                                    v-validate="'required'"
                                    data-vv-name="username"
                                    data-vv-as="'имя пользователя'"
                                    :error-messages="errors.collect('username')"

                                    label="Имя пользователя"
                                    type="text"
                                    required>
                            </v-text-field>
                            <v-text-field
                                    v-model="userForm.firstName"

                                    v-validate="'required'"
                                    data-vv-name="firstName"
                                    data-vv-as="'имя'"
                                    :error-messages="errors.collect('firstName')"

                                    label="Фамилия"
                                    type="text"
                                    required>
                            </v-text-field>
                            <v-text-field
                                    v-model="userForm.secondName"

                                    v-validate="'required'"
                                    data-vv-name="secondName"
                                    data-vv-as="'фамилия'"
                                    :error-messages="errors.collect('secondName')"

                                    label="Имя"
                                    type="text"
                                    required>
                            </v-text-field>
                            <v-text-field
                                    v-model="userForm.lastName"

                                    v-validate="'required'"
                                    data-vv-name="lastName"
                                    data-vv-as="'отчество'"
                                    :error-messages="errors.collect('lastName')"

                                    label="Отчество"
                                    type="text"
                                    required>
                            </v-text-field>
                            <v-container class="fluid">
                                <v-layout row wrap>
                                    <v-checkbox
                                            v-model="userForm.roles"

                                            v-for="(role, i) in roles"
                                            :key="i"

                                            :label="role"
                                            :value="role"/>
                                </v-layout>
                            </v-container>
                            <span v-if="isStudent">
                            <v-text-field
                                    v-model="studentForm.cipher"

                                    v-validate="'required'"
                                    data-vv-name="cipher"
                                    data-vv-as="'шифр'"
                                    :error-messages="errors.collect('cipher')"

                                    label="Шифр"
                                    type="text"
                                    required>
                            </v-text-field>
                            <v-combobox
                                    v-model="studentForm.group"

                                    :items="groups"
                                    item-text="name"

                                    v-validate="{required: true, included_by_id: groups}"
                                    data-vv-name="group"
                                    data-vv-as="'группа'"
                                    :error-messages="errors.collect('group')"

                                    label="Группа"
                                    clearable>
                        </v-combobox>
                        </span>
                            <span v-if="isTeacher">
                            <v-combobox
                                    v-model="teacherForm.subjects"

                                    :items="subjects"
                                    item-text="display"

                                    v-validate="{required: true, included_many_by_id: subjects}"
                                    data-vv-name="subjects"
                                    data-vv-as="'предметы'"
                                    :error-messages="errors.collect('subjects')"

                                    label="Предметы"
                                    chips
                                    clearable
                                    multiple>
                            </v-combobox>
                        </span>
                        </v-form>
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
                        <v-btn @click="submit" class="my-1">
                            Изменить
                        </v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-container>
    </loader>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import Loader from '@/components/Loader.vue';

    import {userHasRole} from '@/helpers/general';
    import {rolesRus, studentRoleName, teacherRoleName} from '@/configs/constants';

    import {ISubject, ListElementSubject, StudentProfileForm, TeacherProfileForm, UserProfileForm} from '@/models';

    import {readUserProfileById} from '@/store/users/getters';
    import {dispatchChangeUserById, dispatchGetUserById} from '@/store/users/actions';

    import {readSubjects} from '@/store/subjects/getters';
    import {dispatchGetSubjects} from '@/store/subjects/actions';

    import {readGroups} from '@/store/groups/getters';
    import {dispatchGetGroups} from '@/store/groups/actions';

    import {dispatchRouteNotFound} from '@/store/app/actions';

    @Component({
        components: {Loader},
    })
    export default class EditUser extends Vue {
        public $refs!: {
            form: HTMLFormElement,
        };

        public userForm: UserProfileForm = new UserProfileForm();
        public studentForm: StudentProfileForm = new StudentProfileForm();
        public teacherForm: TeacherProfileForm = new TeacherProfileForm();

        public loaded: boolean = false;


        public get roles() {
            return rolesRus;
        }

        public get groups() {
            return readGroups(this.$store);
        }

        public get subjects() {
            return readSubjects(this.$store).map((subject: ISubject) => ListElementSubject.fromSubject(subject));
        }

        public get isStudent() {
            return this.userForm.roles.includes(rolesRus[studentRoleName]);
        }

        public get isTeacher() {
            return this.userForm.roles.includes(rolesRus[teacherRoleName]);
        }

        public reset() {
            this.$refs.form.reset();

            this.userForm = UserProfileForm.empty();
            this.studentForm = StudentProfileForm.empty();
            this.teacherForm = TeacherProfileForm.empty();
        }

        public cancel() {
            this.$router.back();
        }

        public async submit() {
            if (await this.$validator.validateAll()) {
                await dispatchChangeUserById(this.$store, {
                    id: this.$router.currentRoute.params.id,
                    user: this.userForm.toUserProfileInUpdate(),
                    student: this.studentForm.toStudentProfileInUpdate(),
                    teacher: this.teacherForm.toTeacherProfileInUpdate(),
                });
            }
        }

        public async mounted() {
            await dispatchGetGroups(this.$store);
            await dispatchGetSubjects(this.$store);
            await dispatchGetUserById(this.$store, this.$router.currentRoute.params.id);


            const user = readUserProfileById(this.$store)(this.$router.currentRoute.params.id);

            if (user) {
                this.userForm = UserProfileForm.fromUserProfile(user);
                if (userHasRole(user, studentRoleName)) {
                    this.studentForm = StudentProfileForm.fromStudentProfile(user.studentProfile!);
                }
                if (userHasRole(user, teacherRoleName)) {
                    this.teacherForm = TeacherProfileForm.fromTeacherProfile(user.teacherProfile!);
                }
            } else {
                await dispatchRouteNotFound(this.$store);
            }

            this.loaded = true;
        }
    }
</script>
