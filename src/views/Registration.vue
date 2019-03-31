<template>
    <v-content>
        <v-container class="fluid fill-height">
            <v-layout class="align-center justify-center">
                <v-flex class="xs12 md5 sm8">
                    <v-card>
                        <v-toolbar>
                            <v-toolbar-title>Регистрация</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                        label="E-mail"
                                        outline>
                                </v-text-field>
                                <v-text-field
                                        label="Номер Студенческого"
                                        outline>

                                </v-text-field>
                                <v-text-field
                                        label="Пароль"
                                        outline>

                                </v-text-field>
                                <v-text-field
                                        label="И ещё раз"
                                        outline>
                                </v-text-field>
                                <v-btn>
                                    Регистрация
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    import {Component, Vue} from "vue-property-decorator/lib/vue-property-decorator";

    @Component
    export default class Registration extends Vue {

    }
</script>

<style scoped>

</style>
