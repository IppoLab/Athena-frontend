import {rolesRus} from '@/configs/constants';

import {IUserProfile} from '@/models';

export class ListElementUser {
    public static fromUserProfile(user: IUserProfile) {
        return new this(
            user.id,
            user.username,
            `${user.secondName} ${user.firstName} ${user.lastName}`,
            user.roles.map((role: string) => rolesRus[role]),
        );
    }

    public constructor(
        public id: string,
        public username: string,
        public fullName: string,
        public roles: string[],
    ) {
    }
}
