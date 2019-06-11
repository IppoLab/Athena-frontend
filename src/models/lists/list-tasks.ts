import {ITask} from '@/models';

export class ListElementTask {
    public static fromTask(task: ITask) {
        return new this(
            task.id,
            task.name,
            `${task.subject.name} (${task.subject.semester} семестр)`,
            task.studentGroup.name,
            task.deadline,
        );
    }

    public constructor(
        public id: string,
        public name: string,
        public subject: string,
        public studentGroup: string,
        public deadline: string,
    ) {
    }
}
