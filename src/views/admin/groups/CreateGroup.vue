<template>
    <v-container class="fluid">
        <v-card class="elevation-10">
            <v-toolbar>
                <v-toolbar-title primary-title>Создание группы</v-toolbar-title>
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
                    Создать
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {dispatchCreateGroup, dispatchGetSpecialities} from '@/store/admin/actions';
    import {ISpeciality} from '@/interfaces';
    import {readAdminSpecialities} from '@/store/admin/getters';

    @Component
    export default class CreateGroup extends Vue {
        public name: string = '';
        public speciality: ISpeciality | null = null;
        public formError: string | boolean = false;

        public async mounted() {
            await dispatchGetSpecialities(this.$store);
            this.reset();
        }

        public reset() {
            this.name = '';
            this.speciality = null;
            this.formError = false;
        }

        public cancel() {
            this.$router.back();
        }

        public get fieldsAreValid() {
            return !!this.name && this.speciality !== null;
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

        public async submit() {
            this.formError = false;

            if (!this.fieldsAreValid) {
                this.formError = 'Проверьте обязательные поля';
            } else {
                await dispatchCreateGroup(this.$store, {
                    name: this.name,
                    speciality: this.speciality!.id,
                });
            }
        }
    }
</script>
