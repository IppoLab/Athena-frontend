<template>
    <div>
        <v-content v-if="loading">
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
        <slot v-else name="content"></slot>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class Loader extends Vue {
        @Prop({default: false}) public loading!: boolean;
    }
</script>
