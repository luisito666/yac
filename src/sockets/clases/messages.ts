import { Message } from './message';

export class Messages {
    public messages: Message[] = [];

    constructor(){}

    getMessages() {
        return this.messages;
    }

    addMessage(message: Message) {
        this.messages.push(message);
    }
}
