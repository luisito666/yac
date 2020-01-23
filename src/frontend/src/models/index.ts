
export class Message {
    constructor(
        public from: string,
        public date: string,
        public message?: any,
        public youtube?: string
    ) {

    }
}


export interface Action {
    type: string;
    payload: any
}
