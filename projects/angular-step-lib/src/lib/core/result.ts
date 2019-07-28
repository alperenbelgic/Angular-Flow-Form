export class Result {
    constructor(init?: Partial<Result>) { 
        Object.assign(this, init);
    }

    successful: boolean;
}