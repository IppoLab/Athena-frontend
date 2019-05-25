import {IUserProfileBase} from '@/models';

export function userHasRole(user: IUserProfileBase | null, role: string) {
    return user && user.roles.includes(role);
}
