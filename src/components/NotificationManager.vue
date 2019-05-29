<template>
    <div>
        <v-snackbar auto-height :color="currentNotificationColor" v-model="show">
            <v-progress-circular class="ma-2" indeterminate v-show="showProgress"/>
            {{ currentNotificationContent }}
            <span v-if="currentNotificationActions.length">
                <v-btn
                        v-for="(action, i) in currentNotificationActions"
                        :key="i"

                        @click.native="action.action"

                        flat>
                    <slot>
                        {{action.name}}
                    </slot>
                </v-btn>
            </span>
            <v-btn v-else flat @click.native="close">
                <slot>
                    Закрыть
                </slot>
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';

    import {IAppNotification, INotificationAction} from '@/models';

    import {readFirstNotification} from '@/store/app/getters';
    import {commitRemoveNotification} from '@/store/app/mutations';
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

        public get currentNotificationActions() {
            if (this.currentNotification && this.currentNotification.actions) {
                return this.currentNotification.actions.map((action: INotificationAction) => {
                    return {
                        name: action.name,
                        action: async () => {
                            await action.action();
                            await this.close();
                        },
                    } as INotificationAction;
                });
            } else {
                return [];
            }
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
