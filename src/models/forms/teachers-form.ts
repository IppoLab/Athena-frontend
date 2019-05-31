import {ISubject, ITeacherProfile, ITeacherProfileInUpdate, ListElementSubject} from '@/models';

export class TeacherProfileForm {
    public static empty() {
        return new this(
            [],
        );
    }

    public static fromTeacherProfile(profile: ITeacherProfile) {
        return new this(
            profile.subjects.map((subject: ISubject) => ListElementSubject.fromSubject(subject)),
        );
    }

    public constructor(public subjects: ListElementSubject[] = []) {
    }

    public toTeacherProfileInUpdate() {
        return {
            subjects: this.subjects.map((subject: ListElementSubject) => subject.id),
        } as ITeacherProfileInUpdate;
    }
}

