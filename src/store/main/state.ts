import {IAuth, IStudentProfile, ITeacherProfile, IUserProfile} from '@/interfaces';

export interface AppNotification {
    content: string;
    color?: string;
    showProgress?: boolean;
}

export interface MainState {
    useDarkTheme: boolean;
    auth: IAuth | null;
    isLoggedIn: boolean | null;
    loginError: boolean;
    notifications: AppNotification[];
    userProfile: IUserProfile | null;
    studentProfile: IStudentProfile | null;
    teacherProfile: ITeacherProfile| null;
}
