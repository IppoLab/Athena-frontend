<template>
    <div>
        <ListTableHeader createLink="/admin/groups/create" :search.sync="search"></ListTableHeader>
        <v-data-table
                :headers="headers"
                :items="groups"
                :pagination.sync="pagination"
                hide-actions
                :search="search">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.speciality.cipher }} {{ props.item.speciality.name }}</td>
                <td class="justify-center layout px-0">
                    <v-tooltip top>
                        <span>Изменить</span>
                        <v-btn slot="activator" flat :to="{name: 'admin-groups-edit', params: {id: props.item.id}}">
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
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {readAdminGroups, readAdminSubjects} from '@/store/admin/getters';
    import {dispatchGetGroups, dispatchGetSpecialities, dispatchGetSubjects} from '@/store/admin/actions';
    import ListTableHeader from '@/components/ListTableHeader.vue';
    @Component({
        components: {
            ListTableHeader,
        },
    })
    export default class ListGroups extends Vue {
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
                text: 'Направление',
                value: 'semester',
                sortable: true,
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

        get groups() {
            return readAdminGroups(this.$store);
        }

        public async mounted() {
            await dispatchGetGroups(this.$store);
            this.pagination.totalItems = this.groups.length;
        }
    }
</script>
