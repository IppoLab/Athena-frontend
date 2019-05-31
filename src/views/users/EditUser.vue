<template>
    <users-form @submit="onSubmit" :preload="infoPreload">
        <span slot="form-title">Изменение пользователя</span>
        <span slot="submit-text">Изменить</span>
        <span slot="extra-actions">
            <v-btn :disabled="true" class="my-1">Сбросить пароль</v-btn>
            <v-btn :disabled="true" class="my-1">
                Заблокировать
            </v-btn>
        </span>
    </users-form>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import UsersForm from '@/components/forms/UsersForm.vue';

    import {dispatchChangeUserById, dispatchGetUserById} from '@/store/users/actions';

    import {dispatchGetGroups} from '@/store/groups/actions';

    import {dispatchGetSubjects} from '@/store/subjects/actions';

    @Component({
        components: {
            UsersForm,
        },
    })
    export default class EditUser extends Vue {
        public async infoPreload() {
            await dispatchGetGroups(this.$store);
            await dispatchGetSubjects(this.$store);
            await dispatchGetUserById(this.$store, this.$router.currentRoute.params.id);
        }

        public async onSubmit(data) {
            await dispatchChangeUserById(this.$store, {
                id: this.$router.currentRoute.params.id,
                user: data.user.toUserProfileInUpdate(),
                student: data.student.toStudentProfileInUpdate(),
                teacher: data.teacher.toTeacherProfileInUpdate(),
            });
        }
    }
</script>
