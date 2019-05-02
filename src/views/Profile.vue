<template>
    <v-content>
        <v-container class="fluid fill-height">
            <v-layout class="align-center justify-center">
                <v-flex class="xs12 md4 sm8">
                    <v-card class="elevation-10">
                        <v-card-title primary-title>
                            <div class="headline primary--text">Профиль</div>
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <v-card-text>
                            <div class="my-4">
                                <div class="subheading text--lighten-3">
                                    <span>Имя пользователя</span>
                                </div>
                                <div class="title primary--text" v-if="userProfile && userProfile.username">
                                    {{userProfile.username}}
                                </div>
                                <div class="title primary--text text--darken-2" v-else>-----</div>
                            </div>
                            <v-divider></v-divider>
                            <div class="my-3">
                                <div class="subheading text--lighten-3">ФИО</div>
                                <div class="title primary--text" v-if="fullName">{{fullName}}</div>
                                <div class="title primary--text" v-else>-----</div>
                            </div>
                            <div v-if="isStudent">
                                <v-divider></v-divider>
                                <div class="my-3">
                                    <div class="subheading text--lighten-3">Группа</div>
                                    <div class="title primary--text">{{studentProfile.studentGroup.name}}</div>
                                    <div class="subheading text--lighten-3">Направление</div>
                                    <div class="title primary--text">{{studentProfile.studentGroup.speciality.name}} {{studentProfile.studentGroup.speciality.cipher}}</div>
                                    <div class="subheading text--lighten-3">Шифр</div>
                                    <div class="title primary--text">{{studentProfile.cipher}}</div>
                                </div>
                            </div>
                            <div v-if="isTeacher">
                                <v-divider></v-divider>
                                <div class="my-3">
                                    <div class="subheading text--lighten-3">Предметы</div>
                                    <v-chip class="title primary--text" v-for="subject of teacherSubjects" :key="subject.id">{{subject.name}} ({{subject.semester}})</v-chip>
                                </div>
                            </div>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn :disabled="true">Сменить пароль</v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {readUserIsStudent, readUserIsTeacher, readUserProfile} from '@/store/main/getters';

    @Component
    export default class UserProfile extends Vue {
        get userProfile() {
            return readUserProfile(this.$store);
        }

        get isStudent() {
            return readUserIsStudent(this.$store);
        }

        get isTeacher() {
            return readUserIsTeacher(this.$store);
        }

        get fullName() {
            const profile = this.userProfile;
            if (profile !== null) {
                const fullName = `${profile.firstName} ${profile.secondName} ${profile.lastName}`;
                if (fullName.trim()) {
                    return fullName;
                }
            }

            return '';
        }

        get studentProfile() {
            return readUserProfile(this.$store)!.studentProfile!;
        }

        get teacherSubjects() {
            return readUserProfile(this.$store)!.teacherProfile!.subjects;
        }
    }
</script>

<style scoped>

</style>
