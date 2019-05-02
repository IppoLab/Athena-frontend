import {IAppNotification, IUserProfile} from '@/interfaces';


export interface MainState {
    accessToken: string;
    refreshToken: string;

    isLoggedIn: boolean | null;
    loginError: boolean;

    userProfile: IUserProfile | null;

    notifications: IAppNotification[];
    useDarkTheme: boolean;
}
