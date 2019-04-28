<template>
    <v-container class="fluid">
        <v-card class="elevation-10">
            <v-toolbar>
                <v-toolbar-title primary-title>Изменение предмета</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <template>
                    <v-form lazy-validation>
                        <v-text-field
                                v-model="name"
                                label="Название предмета"
                                :rules="[() => !!name || 'Поле обязательно']"
                                required
                                type="text">
                        </v-text-field>
                        <v-text-field
                                v-model="semester"
                                label="Семестр"
                                required
                                type="number" min="1" max="8">
                        </v-text-field>
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
    import {readAdminSubjectById} from '@/store/admin/getters';
    import {dispatchChangeSubjectById, dispatchGetSubjects} from '@/store/admin/actions';
    import {dispatchRouteNotFound} from '@/store/main/actions';

    @Component
    export default class EditSubject extends Vue {
        public name: string = '';
        public semester: number = 1;
        public formError: string | boolean = false;

        public reset() {
            this.name = '';
            this.semester = 1;
            this.formError = false;
        }

        public cancel() {
            this.$router.back();
        }

        public async mounted() {
            this.reset();

            await dispatchGetSubjects(this.$store);
            const subject = readAdminSubjectById(this.$store)(this.$router.currentRoute.params.id);

            if (subject) {
                this.name = subject.name;
                this.semester = subject.semester;
            } else {
                await dispatchRouteNotFound(this.$store);
            }
        }

        public get fieldsAreValid() {
            return !!this.name;
        }

        public async submit() {
            this.formError = false;

            if (!this.fieldsAreValid) {
                this.formError = 'Проверьте обязательные поля';
            } else {
                await dispatchChangeSubjectById(this.$store, {
                    id: this.$router.currentRoute.params.id,
                    subject: {
                        name: this.name,
                        semester: this.semester,
                    },
                });
            }
        }
    }
</script>
