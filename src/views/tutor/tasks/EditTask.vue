<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <Loader :loading="!loaded">
        <v-container slot="content" class="fluid">
            <v-card class="elevation-10">
                <v-toolbar>
                    <v-toolbar-title primary-title>Изменение задания</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <template>
                        <v-form lazy-validation>
                            <v-text-field
                                    v-model="name"
                                    label="Название"
                                    :rules="[() => !!name || 'Поле обязательно']"
                                    required
                                    type="text">
                            </v-text-field>
                            <v-text-field
                                    v-model="description"
                                    label="Описание"
                                    :rules="[() => !!description || 'Поле обязательно']"
                                    required
                                    type="text">
                            </v-text-field>
                            <v-dialog
                                    ref="dialog"
                                    v-model="modal"
                                    :return-value.sync="deadline"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            v-model="deadline"
                                            label="Срок сдачи"
                                            readonly
                                            :rules="[() => !!deadline || 'Поле обязательно']"
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                        v-model="deadline"
                                        :min="minDate"
                                        scrollable
                                        locale="ru-ru">
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="modal = false">Отмена</v-btn>
                                    <v-btn flat color="primary" @click="$refs.dialog.save(deadline)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                            <v-combobox
                                    :items="groups"
                                    v-model="group"
                                    clearable
                                    item-text="name"
                                    label="Группа"> a couple of solutions.

                                #
                            </v-combobox>
                            <v-combobox
                                    :items="subjects"
                                    v-model="subject"
                                    label="Предмет"
                                    item-text="display">
                            </v-combobox>
                            <v-layout>
                                <v-text-field
                                        v-if="file"
                                        v-model="file.name"
                                        label="Файл"
                                        readonly></v-text-field>
                                <v-text-field
                                        v-else
                                        label="Файл"
                                        readonly></v-text-field>
                                <UploadButton class="mx-4" @files="handleFile" :acceptable="'application/pdf'">
                                    <div slot="content">файл</div>
                                </UploadButton>
                            </v-layout>
                            <v-layout>
                                <v-text-field
                                        v-if="attachment"
                                        v-model="attachment.name"
                                        label="Приложение"
                                        readonly></v-text-field>
                                <v-text-field
                                        v-else
                                        label="Приложение"
                                        readonly></v-text-field>
                                <UploadButton class="mx-1" @files="handleAttachment" :acceptable="'application/zip'">
                                    <div slot="content">приложение</div>
                                </UploadButton>
                            </v-layout>
                        </v-form>
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
    </Loader>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import UploadButton from '@/components/UploadButton.vue';
    import {dispatchGetGroups} from '@/store/groups/actions';
    import {dispatchGetSubjects} from '@/store/subjects/actions';
    import {readGroupById, readGroups} from '@/store/groups/getters';
    import {readSubjectById, readSubjects} from '@/store/subjects/getters';
    import {ISubject, ISubjectInSelect} from '@/models/subjects';
    import {IGroup} from '@/models';
    import {dispatchGetTaskById, dispatchUpdateTaskById} from '@/store/tasks/actions';
    import Loader from '@/components/Loader.vue';
    import {readTaskById} from '@/store/tasks/getters';

    @Component({
        components: {Loader, UploadButton},
    })
    export default class EditTask extends Vue {
        public modal: boolean = false;

        public name: string = '';
        public description: string = '';
        public deadline: string = '';
        public file?: File;
        public attachment?: File;
        public group: IGroup | null = null;
        public subject: ISubjectInSelect | null = null;
        public loaded: boolean = false;


        public get minDate() {
            const today = new Date(Date.now());
            today.setHours(0);
            return today.toISOString();
        }

        public handleFile(f) {
            this.file = f[0];
        }

        public handleAttachment(f) {
            this.attachment = f[0];
        }

        public async mounted() {
            await dispatchGetSubjects(this.$store);
            await dispatchGetGroups(this.$store);
            await dispatchGetTaskById(this.$store, this.$router.currentRoute.params.id);

            const task = readTaskById(this.$store)(this.$router.currentRoute.params.id);

            if (task) {
                this.name = task.name;
                this.description = task.description;
                this.deadline = task.deadline;
                this.group = readGroupById(this.$store)(task.studentGroup.id);
                this.subject = ((subject: ISubject) => {
                    return {
                        id: subject.id,
                        semester: subject.semester,
                        name: subject.name,
                        display: `${subject.name} (${subject.semester} семестр)`,
                    };
                })(readSubjectById(this.$store)(task.subject.id)!);
            }

            this.loaded = true;
        }

        public reset() {
            this.name = '';
            this.description = '';
            this.deadline = '';
            this.group = null;
            this.subject = null;
            this.file = undefined;
            this.attachment = undefined;
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

        public cancel() {
            this.$router.back();
        }

        public get fieldsAreValid() {
            return (
                !!this.name &&
                !!this.description &&
                !!this.deadline &&
                !!this.group &&
                !!this.subject
            );
        }

        public async submit() {
            await dispatchUpdateTaskById(this.$store, {
                id: this.$router.currentRoute.params.id, task: {
                    name: this.name,
                    description: this.description,
                    subject: this.subject!.id,
                    studentGroup: this.group!.id,
                    deadline: this.deadline,
                    file: this.file,
                    attachment: this.attachment,
                },
            });
        }
    }
</script>
