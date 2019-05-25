<template>
    <Loader :loading="!loaded">
        <v-container slot="content" class="fluid">
            <v-card class="elevation-10">
                <v-toolbar>
                    <v-toolbar-title primary-title>Задание</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <template>
                        <v-form lazy-validation>
                            <v-text-field
                                    v-model="name"
                                    label="Название"
                                    readonly
                                    type="text">
                            </v-text-field>
                            <v-text-area
                                    v-model="description"
                                    label="Описание"
                                    readonly
                                    type="text">
                            </v-text-area>
                            <v-text-field
                                    v-model="deadline"
                                    label="Срок сдачи"
                                    readonly
                            ></v-text-field>
                            <v-text-field
                                    v-model="subject"
                                    label="Предмет"
                                    readonly
                                    text-value="display">
                            </v-text-field>
                            <v-btn
                                    :href="file"
                                    target="_blank" :disabled="!file">
                                Файл
                            </v-btn>
                            <v-btn
                                    :href="attachment"
                                    target="_blank" :disabled="!attachment">
                                Приложение
                            </v-btn>
                        </v-form>
                    </template>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="cancel">Назад</v-btn>
                    <v-btn @click="viewReport">
                        Отчет
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </Loader>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import UploadButton from '@/components/UploadButton.vue';
    import {ListElementSubject} from '@/models/subjects';
    import {dispatchGetTaskById} from '@/store/tasks/actions';
    import Loader from '@/components/Loader.vue';
    import {readTaskById} from '@/store/tasks/getters';
    import {dispatchRouteReportCreateOrEdit} from '@/store/reports/actions';

    @Component({
        components: {Loader, UploadButton},
    })
    export default class ViewTask extends Vue {
        public name: string = '';
        public description: string = '';
        public deadline: string = '';
        public file: string | null = null;
        public attachment: string | null = null;
        public subject: string = '';
        public loaded: boolean = false;


        public async mounted() {
            await dispatchGetTaskById(this.$store, this.$router.currentRoute.params.id);

            const task = readTaskById(this.$store)(this.$router.currentRoute.params.id);

            if (task) {
                this.name = task.name;
                this.description = task.description;
                this.deadline = task.deadline;
                this.subject = new ListElementSubject(task.subject).display;
                this.file = task.file;
                this.attachment = task.attachment;

                this.loaded = true;
            }
        }

        public reset() {
            this.name = '';
            this.description = '';
            this.deadline = '';
            this.file = '';
            this.attachment = '';
        }

        public cancel() {
            this.$router.back();
        }

        public async viewReport() {
            await dispatchRouteReportCreateOrEdit(this.$store, this.$router.currentRoute.params.id);
        }
    }
</script>
