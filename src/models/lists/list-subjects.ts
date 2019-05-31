import {ISubject} from '@/models';

export class ListElementSubject {
    public static fromSubject(subject: ISubject) {
        return new this(
            subject.id,
            subject.name,
            subject.semester,
        );
    }

    public constructor(public id: string, public name: string, public semester: number) {
        this.id = id;
        this.name = name;
        this.semester = semester;
    }

    public get display() {
        return `${this.name} (${this.semester})`;
    }
}
