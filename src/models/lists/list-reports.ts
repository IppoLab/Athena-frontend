import {IReport} from '@/models';
import {statusRus} from '@/configs/constants';

export class ListElementReport {
    public static fromReport(report: IReport) {
        return new this(
            report.id,
            report.name,
            statusRus[report.status],
        );
    }

    public constructor(
        public id: string,
        public name: string,
        public status: string,
    ) {
    }
}
