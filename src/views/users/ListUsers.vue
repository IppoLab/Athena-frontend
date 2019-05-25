<template>
    <loader :loading="!loaded">
        <div slot="content">
            <list-table-header buttonLink="/admin/users/create" :search.sync="search"></list-table-header>
            <v-data-table
                    :headers="headers"
                    :items="users"
                    :pagination.sync="pagination"
                    :search="search"
                    hide-actions>
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.username }}</td>
                    <td>{{ props.item.fullName }}</td>
                    <td>
                        <span v-for="role in props.item.roles" :key="role">
                            <v-chip>{{role}}</v-chip>
                        </span>
                    </td>
                    <td class="justify-center layout px-0">
                        <v-btn slot="activator" flat :to="{name: 'users-view', params: {id: props.item.id}}">
                            <v-icon>remove_red_eye</v-icon>
                        </v-btn>
                    </td>
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
    import {Component, Vue} from 'vue-property-decorator';

    import Loader from '@/components/Loader.vue';
    import ListTableHeader from '@/components/ListTableHeader.vue';

    import {IUserProfile, ListElementUser} from '@/models';

    import {readUsers} from '@/store/users/getters';
    import {dispatchGetUsers} from '@/store/users/actions';


    @Component({
        components: {
            Loader,
            ListTableHeader,
        },
    })
    export default class Users extends Vue {
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
            {
                text: 'Действия',
                sortable: false,
                align: 'center',
            },
        ];


        get pages() {
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
        }

        get users() {
            return readUsers(this.$store).map((user: IUserProfile) => ListElementUser.fromUserProfile(user));
        }

        public async mounted() {
            await dispatchGetUsers(this.$store);
            this.pagination.totalItems = this.users.length;
            this.loaded = true;
        }
    }
</script>
