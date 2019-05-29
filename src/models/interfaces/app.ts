export interface INotificationAction {
    name: string;
    action: () => Promise<void>;
}

export interface IAppNotification {
    content: string;
    color?: string;
    showProgress?: boolean;
    actions?: INotificationAction[];
}
