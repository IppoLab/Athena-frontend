<template>
    <v-content v-if="!loaded">
        <v-container fill-height>
            <v-layout align-center justify-center>
                <v-flex>
                    <div class="text-xs-center">
                        <div class="headline my-5">Загрузка...</div>
                        <v-progress-circular size="100" indeterminate color="primary"></v-progress-circular>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
    <v-container v-else class="fluid">
        <v-card class="elevation-10">
            <v-toolbar>
                <v-toolbar-title primary-title>Изменение группы</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <template>
                    <v-form lazy-validation>
                        <v-text-field
                                v-model="name"
                                label="Название группы"
                                :rules="[() => !!name || 'Поле обязательно']"
                                required
                                type="text">
                        </v-text-field>
                        <v-combobox
                                :items="specialities"
                                v-model="speciality"
                                clearable
                                item-text="display"
                                label="Направление">
                        </v-combobox>
                    </v-form>
                    <v-alert :value="formError" type="error" transition="fade-transition" v-if="formError">
                        {{formError}}
                    </v-alert>
                </template>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cancel">Назад</v-btn>
                <v-btn @click="reset">Очистить</v-btn>
                <v-btn @click="submit" :disabled="!fieldsAreValid">
                    Изменить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {readAdminGroupById, readAdminSpecialities} from '@/store/admin/getters';
    import {dispatchChangeGroupById, dispatchGetGroups} from '@/store/admin/actions';
    import {IDisplaySpeciality, ISpeciality} from '@/interfaces';
    import {dispatchRouteNotFound} from '@/store/main/actions';

    @Component
    export default class EditGroup extends Vue {
        public name: string = '';
        public speciality: IDisplaySpeciality | null = null;
        public formError: string | boolean = false;
        public loaded: boolean = false;

        public reset() {
            this.name = '';
            this.speciality = null;
            this.formError = false;
        }

        public cancel() {
            this.$router.back();
        }

        public async mounted() {
            this.reset();

            await dispatchGetGroups(this.$store);
            const group = readAdminGroupById(this.$store)(this.$router.currentRoute.params.id);

            if (group) {
                const speciality = group.speciality!;

                this.name = group.name;
                this.speciality = {
                    id: speciality.id,
                    name: speciality.name,
                    cipher: speciality.cipher,
                    display: `${speciality.cipher} ${speciality.name}`,
                };
            } else {
                await dispatchRouteNotFound(this.$store);
            }

            this.loaded = true;
        }

        public get specialities() {
            return readAdminSpecialities(this.$store).map((speciality: ISpeciality) => {
                return {
                    id: speciality.id,
                    name: speciality.name,
                    cipher: speciality.cipher,
                    display: `${speciality.cipher} ${speciality.name}`,
                };
            });
        }

        public get fieldsAreValid() {
            return !!this.name && !!this.speciality;
        }

        public async submit() {
            this.formError = false;

            if (!this.fieldsAreValid) {
                this.formError = 'Проверьте обязательные поля';
            } else {
                await dispatchChangeGroupById(this.$store, {
                    id: this.$router.currentRoute.params.id,
                    group: {
                        name: this.name,
                        speciality: this.speciality!.id,
                    },
                });
            }
        }
    }
</script>
