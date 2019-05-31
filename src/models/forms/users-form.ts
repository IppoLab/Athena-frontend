import {findKeyByValue, rolesRus} from '@/configs/constants';

import {IUserProfile, IUserProfileInCreate, IUserProfileInUpdate} from '@/models';

export class UserProfileForm {
    public static empty() {
        return new this();
    }

    public static fromUserProfile(user: IUserProfile) {
        return new this(
            user.username,
            '',
            '',
            user.firstName,
            user.secondName,
            user.lastName,
            user.roles.map((role: string) => rolesRus[role]),
        );
    }

    public constructor(
        public username: string = '',
        public password: string = '',
        public passwordConfirmation: string = '',
        public firstName: string = '',
        public secondName: string = '',
        public lastName: string = '',
        public roles: string[] = [],
    ) {
    }

    public toUserProfileInCreate() {
        return {
            ...this,
            roles: this.roles.map((role: string) => findKeyByValue(rolesRus, role)),
        } as IUserProfileInCreate;
    }

    public toUserProfileInUpdate() {
        return {
            ...this,
            roles: this.roles.map((role: string) => findKeyByValue(rolesRus, role)),
        } as IUserProfileInUpdate;
    }
}
