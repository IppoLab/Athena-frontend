<template>
    <items-list
            :headers="headers"
            :preload="loadTasks"
            :items="tasks"
            @itemClick="routeTask"
    ></items-list>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import ItemsList from '@/components/ItemsList.vue';

    import {readTasks} from '@/store/tasks/getters';
    import {dispatchGetTasks, dispatchRouteViewTask} from '@/store/tasks/actions';

    import {ITask, ListElementTask} from '@/models';

    @Component({
        components: {
            ItemsList,
        },
    })
    export default class ListTasks extends Vue {
        public get headers() {
            const headers = [
                {
                    text: 'Название',
                    value: 'name',
                    sortable: false,
                    align: 'left',
                },
                {
                    text: 'Предмет',
                    value: 'subject',
                    sortable: false,
                    align: 'left',
                },
                {
                    text: 'Срок сдачи',
                    value: 'deadline',
                    sortable: true,
                    align: 'left',
                },
            ];

            if (this.$route.params.type === 'tutor') {
                headers.splice(2, 0, {
                    text: 'Группа',
                    value: 'studentGroup',
                    sortable: false,
                    align: 'left',
                });
            }

            return headers;
        }

        public get tasks() {
            return readTasks(this.$store).map((task: ITask) => ListElementTask.fromTask(task));
        }

        public async routeTask(id: string) {
            await dispatchRouteViewTask(this.$store, id);
        }

        public async loadTasks() {
            await dispatchGetTasks(this.$store);
        }
    }
</script>
