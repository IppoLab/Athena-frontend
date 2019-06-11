import {IGroup} from '@/models';

export class ListElementGroup {
    public static fromGroup(task: IGroup) {
        return new this(
            task.id,
            task.name,
            `${task.speciality!.cipher} ${task.speciality!.name}`,
        );
    }

    public constructor(
        public id: string,
        public name: string,
        public speciality: string,
    ) {
    }
}
