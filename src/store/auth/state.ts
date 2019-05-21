import {IUserProfile} from '@/models';


export interface AuthState {
    accessToken: string;
    refreshToken: string;
    isLoggedIn: boolean | null;
    loginError: boolean;
    currentUserProfile: IUserProfile | null;
}
