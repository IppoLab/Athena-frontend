<template>
    <Loader :loading="!loaded">
        <v-container slot="content" class="fluid">
            <v-card class="elevation-10">
                <v-toolbar>
                    <v-toolbar-title primary-title>Изменение отчета</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <template>
                        <v-form lazy-validation>
                            <v-text-field
                                    v-model="name"
                                    label="Название"
                                    type="text"
                                    readonly>
                            </v-text-field>
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
                    <v-btn @click="toTask">Задание</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="cancel">Назад</v-btn>
                    <v-btn @click="submit">
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
    import {dispatchRouteViewTask} from '@/store/tasks/actions';
    import Loader from '@/components/Loader.vue';
    import {dispatchChangeReportById, dispatchGetReportByTaskId} from '@/store/reports/actions';
    import {readCurrentUserProfile} from '@/store/auth/getters';
    import {readReportByTaskId} from '@/store/reports/getters';

    @Component({
        components: {Loader, UploadButton},
    })
    export default class ViewReport extends Vue {
        public reportId: string = '';
        public name: string = '';
        public file: File | string | null = null;
        public attachment: File | string | null = null;
        public loaded: boolean = false;

        public handleFile(f) {
            this.file = f[0];
        }

        public handleAttachment(f) {
            this.attachment = f[0];
        }

        public async mounted() {
            await dispatchGetReportByTaskId(this.$store, this.$route.params.id);

            const report = readReportByTaskId(this.$store)(readCurrentUserProfile(this.$store)!.id, this.$route.params.id);
            if (report) {
                this.reportId = report.id;
                this.name = report.name;

                this.loaded = true;
            }
        }

        public reset() {
            this.name = '';
            this.file = null;
            this.attachment = null;
        }

        public cancel() {
            this.$router.back();
        }

        public async submit() {
            await dispatchChangeReportById(this.$store, {
                id: this.reportId,
                report: {
                    name: this.name,
                    file: (this.file as File) || undefined,
                    attachment: (this.attachment as File) || undefined,
                },
            });
        }

        public async toTask() {
            await dispatchRouteViewTask(this.$store, this.$router.currentRoute.params.id);
        }
    }
</script>
