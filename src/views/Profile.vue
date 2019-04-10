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
                            <div class="my-3">
                                <div class="subheading text--lighten-3">ФИО</div>
                                <div class="title primary--text" v-if="fullName">{{fullName}}</div>
                                <div class="title primary--text" v-else>-----</div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {readUserIsStudent, readUserProfile} from '@/store/main/getters';

    @Component
    export default class UserProfile extends Vue {
        get userProfile() {
            return readUserProfile(this.$store);
        }

        get userIsStudent() {
            return readUserIsStudent(this.$store);
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
    }
</script>

<style scoped>

</style>
