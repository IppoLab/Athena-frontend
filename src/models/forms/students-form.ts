import {IGroup, IStudentProfile, IStudentProfileInUpdate} from '@/models';

export class StudentProfileForm {
    public static empty() {
        return new this(
            '',
            null,
        );
    }

    public static fromStudentProfile(profile: IStudentProfile) {
        return new this(
            profile.cipher,
            profile.studentGroup,
        );
    }

    public constructor(
        public cipher: string = '',
        public group: IGroup | null = null,
    ) {
    }

    public toStudentProfileInUpdate() {
        return {
            cipher: this.cipher,
            studentGroup: this.group ? this.group.id : '',
        } as IStudentProfileInUpdate;
    }
}
