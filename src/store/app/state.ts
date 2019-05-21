import {IAppNotification} from '@/models';

export interface AppState {
    notifications: IAppNotification[];
    useDarkTheme: boolean;
}
