import {IGroup, ISpeciality, IUserProfile} from '@/interfaces';
import {ISubject} from '@/interfaces/subject';

export interface AdminState {
    users: IUserProfile[];
    subjects: ISubject[];
    specialities: ISpeciality[];
    groups: IGroup[];
}
