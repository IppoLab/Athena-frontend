<template>
    <loader :loading="!loaded">
        <div slot="content">
            <list-table-header :buttonLink="creationLink" :search.sync="search"></list-table-header>
            <v-data-table
                    :headers="headers"
                    :items="items"
                    :pagination.sync="pagination"
                    :search="search"
                    hide-actions>
                <template slot="items" slot-scope="props">
                    <tr @click="routeUser(props.item.id)">
                        <td>{{ props.item.username }}</td>
                        <td>{{ props.item.fullName }}</td>
                        <td>
                        <span v-for="role in props.item.roles" :key="role">
                            <v-chip>{{role}}</v-chip>
                        </span>
                        </td>
                    </tr>
                </template>
                <v-alert slot="no-data" :value="true" color="error" icon="warning">
                    Данных нет
                </v-alert>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Данных нет
                </v-alert>
            </v-data-table>
            <div class="text-xs-center pt-2">
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
        </div>
    </loader>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    import Loader from '@/components/Loader.vue';
    import ListTableHeader from '@/components/ListTableHeader.vue';

    import {IUserProfile, ListElementUser} from '@/models';

    import {readUsers} from '@/store/users/getters';
    import {dispatchGetUsers, dispatchRouteEditUser} from '@/store/users/actions';


    @Component({
        components: {
            Loader,
            ListTableHeader,
        },
    })
    export default class Users extends Vue {
        @Prop({default: []}) items: any[] = [];
        @Prop({default: ''}) public creationLink!: string;

        public loaded: boolean = false;
        public search: string = '';
        public pagination = {
            rowsPerPage: 10,
            totalItems: 0,
        };

        public headers = [
            {
                text: 'Имя пользователя',
                value: 'username',
                sortable: false,
                align: 'left',
            },
            {
                text: 'ФИО',
                value: 'fullName',
                sortable: false,
                align: 'left',
            },
            {
                text: 'Права',
                value: 'roles',
                sortable: false,
                align: 'left',
            },
        ];

        public async routeUser(id: string) {
            await dispatchRouteEditUser(this.$store, id);
        }

        get pages() {
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
        }

        public async mounted() {
            await dispatchGetUsers(this.$store);
            this.pagination.totalItems = this.items.length;
            this.loaded = true;
        }
    }
</script>
