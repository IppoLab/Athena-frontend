import {ISpeciality} from '@/models';

export class ListElementSpeciality implements ISpeciality {
    public id!: string;
    public name!: string;
    public cipher!: string;

    public constructor({id, name, cipher}: ISpeciality) {
        this.id = id;
        this.name = name;
        this.cipher = cipher;
    }

    public get display() {
        return `${this.cipher} ${this.name}`;
    }
}
