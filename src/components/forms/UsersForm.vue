<template>
    <loader :loading="!loaded">
        <v-container slot="content" class="fluid">
            <v-card>
                <v-card-title primary-title>
                    <div class="headline primary--text">
                        <slot name="form-title"></slot>
                    </div>
                </v-card-title>
                <v-card-text>
                    <template>
                        <v-form ref="form" lazy-validation>
                            <v-text-field
                                    v-model="userForm.username"

                                    v-validate="'required'"
                                    data-vv-name="username"
                                    data-vv-as="'логин'"
                                    :error-messages="errors.collect('username')"

                                    label="Логин"
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

                                            v-validate="{required: true, at_least_one: structValues(roles)}"
                                            data-vv-name="roles"
                                            data-vv-as="'роль'"
                                            :error-messages="errors.collect('roles')"

                                            v-for="(role, i) in roles"
                                            :key="i"

                                            :label="role"
                                            :value="role"
                                            type="checkbox"
                                            required/>
                                </v-layout>
                            </v-container>
                            <span v-if="isStudent">
                                <v-text-field
                                        v-model="studentForm.cipher"

                                        v-validate.persist="'required'"
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

                                        v-validate.persist="{required: true, included_by_id: groups}"
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

                                        v-validate.persist="{required: true, included_many_by_id: subjects}"
                                        data-vv-name="subjects"
                                        data-vv-as="'предметы'"
                                        :error-messages="errors.collect('subjects')"

                                        label="Предметы"
                                        chips
                                        clearable
                                        multiple>
                                </v-combobox>
                            </span>
                            <span v-if="creating">
                                <v-text-field
                                        v-model="userForm.password"

                                        v-validate.persist="'required'"
                                        :error-messages="errors.collect('password')"
                                        data-vv-name="password"
                                        data-vv-as="'пароль'"
                                        data-vv-delay="100"
                                        ref="password"

                                        label="Пароль"
                                        type="password"
                                        required>
                                </v-text-field>
                                <v-text-field
                                        v-model="userForm.passwordConfirmation"

                                        v-validate.persist="'required|confirmed:password'"
                                        :error-messages="errors.collect('password_confirmation')"
                                        data-vv-name="password_confirmation"
                                        data-vv-as="'подтвержение пароля'"
                                        data-vv-delay="100"
                                        target="password"

                                        label="Пароль, ещё раз"
                                        type="password"
                                        required>
                                </v-text-field>
                            </span>
                        </v-form>
                    </template>
                </v-card-text>
                <v-card-actions>
                    <v-layout row wrap>
                        <slot name="extra-actions"></slot>
                        <v-spacer></v-spacer>
                        <v-btn @click="cancel" class="my-1">Назад</v-btn>
                        <v-btn @click="reset" class="my-1">Очистить</v-btn>
                        <v-btn @click="submit" class="my-1">
                            <slot name="submit-text"></slot>
                        </v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-container>
    </loader>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    import Loader from '@/components/Loader.vue';

    import {userHasRole} from '@/services/general.service';
    import {rolesRus, structValues, studentRoleName, teacherRoleName} from '@/configs/constants';

    import {ISubject, ListElementSubject, StudentProfileForm, TeacherProfileForm, UserProfileForm} from '@/models';

    import {readUserProfileById} from '@/store/users/getters';

    import {readSubjects} from '@/store/subjects/getters';

    import {readGroups} from '@/store/groups/getters';

    import {dispatchRouteNotFound} from '@/store/app/actions';

    @Component({
        components: {Loader},
    })
    export default class EditUser extends Vue {
        @Prop({default: false}) public creating!: boolean;
        @Prop({default: async () => undefined}) public preload!: CallableFunction;

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

        public structValues(s) {
            return structValues(s);
        }

        public async reset() {
            this.userForm = UserProfileForm.empty();
            this.studentForm = StudentProfileForm.empty();
            this.teacherForm = TeacherProfileForm.empty();

            this.$refs.form.reset();
            await this.$validator.reset();
        }

        public cancel() {
            this.$router.back();
        }

        public async submit() {
            if (await this.$validator.validateAll()) {
                this.$emit('submit', {
                    id: this.$router.currentRoute.params.id,
                    user: this.userForm,
                    student: this.studentForm,
                    teacher: this.teacherForm,
                });
            }
        }

        public async mounted() {
            await this.preload();

            if (!this.creating) {
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
            }

            this.loaded = true;
        }
    }
</script>
