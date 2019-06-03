<template>
    <div>
        <v-snackbar auto-height :color="currentNotificationColor" v-model="show">
            <v-progress-circular class="ma-2" indeterminate v-show="showProgress"></v-progress-circular>
            {{ currentNotificationContent }}
            <v-btn flat @click.native="close">Закрыть</v-btn>
        </v-snackbar>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';

    import {IAppNotification} from '@/models';

    import {commitRemoveNotification} from '@/store/app/mutations';
    import {readFirstNotification} from '@/store/app/getters';
    import {dispatchRemoveNotification} from '@/store/app/actions';

    @Component
    export default class NotificationsManager extends Vue {
        public show: boolean = false;
        public text: string = '';
        public showProgress: boolean = false;
        public currentNotification: IAppNotification | false = false;

        public get firstNotification() {
            return readFirstNotification(this.$store);
        }

        public get currentNotificationContent() {
            return this.currentNotification && this.currentNotification.content || '';
        }

        public get currentNotificationColor() {
            return this.currentNotification && this.currentNotification.color || 'info';
        }

        public async hide() {
            this.show = false;
            await new Promise((resolve) => setTimeout(() => resolve(), 500));
        }

        public async close() {
            await this.hide();
            await this.removeCurrentNotification();
        }

        public async removeCurrentNotification() {
            if (this.currentNotification) {
                commitRemoveNotification(this.$store, this.currentNotification);
            }
        }

        public async setNotification(notification: IAppNotification | false) {
            if (this.show) {
                await this.hide();
            }
            if (notification) {
                if (this.currentNotification && notification.content === this.currentNotificationContent) {
                    return;
                }

                this.currentNotification = notification;
                this.showProgress = notification.showProgress || false;
                this.show = true;
            } else {
                this.currentNotification = false;
            }
        }

        @Watch('firstNotification')
        public async onNotificationChange(
            newNotification: IAppNotification | false,
        ) {
            if (newNotification !== this.currentNotification) {
                await this.setNotification(newNotification);
                if (newNotification) {
                    await dispatchRemoveNotification(this.$store, {notification: newNotification, timeout: 6500});
                }
            }
        }
    }
</script>
