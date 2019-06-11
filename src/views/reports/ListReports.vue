<template>
    <items-list
            :creationLink="{name: 'reports-new'}"
            :headers="headers"
            :items="reports"
            :preload="loadReports"
            @itemClick="routeReport"
    ></items-list>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import ItemsList from '@/components/ItemsList.vue';

    import {IReport, ListElementReport} from '@/models';

    import {readReports} from '@/store/reports/getters';
    import {dispatchGetReports, dispatchRouteReportEdit} from '@/store/reports/actions';

    @Component({
        components: {
            ItemsList,
        },
    })
    export default class ListReports extends Vue {
        public get headers() {
            const headers = [
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
            ];

            if (this.$route.params.type === 'tutor') {
                headers.splice(1, 0, {
                    text: 'Группа',
                    value: 'studentGroup',
                    sortable: false,
                    align: 'left',
                });
            }

            return headers;
        }

        get reports() {
            return readReports(this.$store).map((report: IReport) => ListElementReport.fromReport(report));
        }

        public async loadReports() {
            await dispatchGetReports(this.$store);
        }

        public async routeReport(id: string) {
            await dispatchRouteReportEdit(this.$store, id);
        }
    }
</script>
