export interface IUserInLogin {
    username: string;
    password: string;
}

export interface IUserProfile {
    id: string;
    username: string;
    firstName: string;
    secondName: string;
    lastName: string;
    roles: string[];
    studentProfile?: IStudentProfile;
    teacherProfile?: ITeacherProfile;
}

export interface IStudentProfile {
    cipher: string;
    studentGroup: string;
}

export interface ITeacherProfile {
    subjects: string[];
}

export interface IUserInCreate {
    username: string;
    password: string;
    firstName: string;
    secondName: string;
    lastName: string;
    roles: string[];
}
