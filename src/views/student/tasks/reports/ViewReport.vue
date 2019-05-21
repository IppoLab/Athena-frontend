<template>
    <Loader :loading="!loaded">
        <v-container slot="content" class="fluid">
            <v-card class="elevation-10">
                <v-toolbar>
                    <v-toolbar-title primary-title>Просмотр отчета</v-toolbar-title>
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
                            <v-text-field
                                    v-model="tutorFullName"
                                    label="ФИО проверяющего"
                                    readonly>
                            </v-text-field>
                            <v-text-field
                                    v-model="status"
                                    label="Статус работы"
                                    readonly>
                            </v-text-field>
                            <v-text-field
                                    v-model="comment"
                                    label="Комментарий"
                                    readonly>
                            </v-text-field>
                            <v-text-field
                                    v-model="createdAt"
                                    label="Время создания"
                                    readonly>
                            </v-text-field>
                            <v-text-field
                                    v-model="updatedAt"
                                    label="Время обновления"
                                    readonly>
                            </v-text-field>
                            <v-text-field
                                    v-model="checkedAt"
                                    label="Время проверки"
                                    readonly>
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
                    <v-btn @click="toTask">Задание</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="cancel">Назад</v-btn>
                    <v-btn :to="{name: 'student-edit-report', params: {id: this.$route.params.id}}">
                        Изменить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </Loader>
</template>

<script lang="ts">
    import {DateTime} from 'luxon';
    import {Component, Vue} from 'vue-property-decorator';
    import UploadButton from '@/components/UploadButton.vue';
    import {dispatchRouteViewTask} from '@/store/tasks/actions';
    import Loader from '@/components/Loader.vue';
    import {dispatchGetReportByTaskId} from '@/store/reports/actions';
    import {readCurrentUserProfile} from '@/store/auth/getters';
    import {readReportByTaskId} from '@/store/reports/getters';
    import {statusRus} from '@/configs/constants';

    @Component({
        components: {Loader, UploadButton},
    })
    export default class ViewReport extends Vue {
        public reportId: string = '';
        public name: string = '';
        public file: string | null = null;
        public attachment: string | null = null;
        public comment: string | null = null;
        public loaded: boolean = false;
        public tutorFullName: string = '';
        public createdAt: string = '';
        public updatedAt: string = '';
        public checkedAt: string = '';
        public status: string = '';

        public async mounted() {
            await dispatchGetReportByTaskId(this.$store, this.$route.params.id);

            const report = readReportByTaskId(this.$store)(readCurrentUserProfile(this.$store)!.id, this.$route.params.id);
            if (report) {
                const tutor = report.verifiedBy;

                this.reportId = report.id;
                this.name = report.name;
                this.file = report.file;
                this.attachment = report.attachment;
                this.comment = report.comment;
                this.tutorFullName = tutor ?
                    `${tutor.secondName} ${tutor.firstName} ${tutor.lastName}` : 'Еще не проверено';

                this.createdAt = report.createdAt ? DateTime.fromISO(report.createdAt).toFormat('yyyy-MM-dd HH:mm') : '';
                this.updatedAt = report.updatedAt ? DateTime.fromISO(report.updatedAt).toFormat('yyyy-MM-dd HH:mm') : '';
                this.checkedAt = report.checkedAt ? DateTime.fromISO(report.checkedAt).toFormat('yyyy-MM-dd HH:mm') : '';

                this.status = statusRus[report.status];

                this.loaded = true;
            }
        }

        public cancel() {
            this.$router.back();
        }

        public async toTask() {
            await dispatchRouteViewTask(this.$store, this.$router.currentRoute.params.id);
        }
    }
</script>
