<template>
    <Loader :loading="!loaded">
        <div slot="content">
            <ListTableHeader buttonLink="/tutor/tasks/create" :search.sync="search"></ListTableHeader>
            <v-data-table
                    :headers="headers"
                    :items="reports"
                    :pagination.sync="pagination"
                    hide-actions
                    :search="search">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.status }}</td>
                    <td class="justify-center layout px-0">
                        <v-tooltip top>
                            <span>Изменить</span>
                            <v-btn slot="activator" flat
                                   :to="{name: 'tutor-view-report', params: {id: props.item.id}}">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </v-tooltip>
                    </td>
                </template>
                <template slot="no-data">
                    <v-alert :value="true" color="error" icon="warning">
                        Данных нет
                    </v-alert>
                </template>
                <template slot="no-results">
                    <v-alert :value="true" color="error" icon="warning">
                        Данных нет
                    </v-alert>
                </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
        </div>
    </Loader>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ListTableHeader from '@/components/ListTableHeader.vue';
    import {readReports} from '@/store/reports/getters';
    import {dispatchGetReports} from '@/store/reports/actions';
    import {IReport} from '@/models';
    import {statusRus} from '@/configs/constants';
    import Loader from '@/components/Loader.vue';

    @Component({
        components: {
            Loader,
            ListTableHeader,
        },
    })
    export default class ListReports extends Vue {
        public loaded: boolean = false;
        public search: string = '';
        public pagination = {
            rowsPerPage: 10,
            totalItems: 0,
        };

        public headers = [
            {
                text: 'Название',
                value: 'name',
                sortable: false,
                align: 'left',
            },
            {
                text: 'Статус',
                value: 'status',
                sortable: false,
                align: 'left',
            },
            {
                text: 'Действия',
                sortable: false,
                align: 'center',
            },
        ];

        get pages() {
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
        }

        get reports() {
            return readReports(this.$store).map((report: IReport) => {
                return {
                    ...report,
                    status: statusRus[report.status],
                };
            });
        }

        public async mounted() {
            await dispatchGetReports(this.$store);
            this.pagination.totalItems = this.reports.length;
            this.loaded = true;
        }
    }
</script>
