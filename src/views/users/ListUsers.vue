<template>
    <items-list
            :creationLink="{name: 'users-new'}"
            :headers="headers"
            :preload="loadUsers"
            :items="users"
            @itemClick="routeUser"
    ></items-list>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import ItemsList from '@/components/ItemsList.vue';

    import {IUserProfile, ListElementUser} from '@/models';

    import {readUsers} from '@/store/users/getters';
    import {dispatchGetUsers, dispatchRouteEditUser} from '@/store/users/actions';


    @Component({
        components: {
            ItemsList,
        },
    })
    export default class ListUsers extends Vue {
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

        public get users() {
            return readUsers(this.$store).map((user: IUserProfile) => ListElementUser.fromUserProfile(user));
        }

        public async routeUser(id: string) {
            await dispatchRouteEditUser(this.$store, id);
        }

        public async loadUsers() {
            await dispatchGetUsers(this.$store);
        }
    }
</script>
