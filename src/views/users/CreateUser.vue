<template>
    <users-form
            :creating="true"
            :preload="infoPreload"
            @submit="onSubmit">
        <span slot="form-title">Создание пользователя</span>
        <span slot="submit-text">Создать</span>
    </users-form>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import UsersForm from '@/components/forms/UsersForm.vue';

    import {dispatchCreateUser} from '@/store/users/actions';

    import {dispatchGetGroups} from '@/store/groups/actions';

    import {dispatchGetSubjects} from '@/store/subjects/actions';

    @Component({
        components: {
            UsersForm,
        },
    })
    export default class CreateUser extends Vue {
        public async infoPreload() {
            await dispatchGetGroups(this.$store);
            await dispatchGetSubjects(this.$store);
        }

        public async onSubmit(data) {
            await dispatchCreateUser(this.$store, {
                user: data.user.toUserProfileInCreate(),
                student: data.student.toStudentProfileInUpdate(),
                teacher: data.teacher.toTeacherProfileInUpdate(),
            });
        }
    }
</script>
