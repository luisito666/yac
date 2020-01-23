import { Message } from './message';

export class Messages {
    private messages: Message[] = [];

    constructor(){}

    getMessages() {
        return this.messages;
    }

    addMessage(message: Message) {
        this.messages.push(message);
    }
}
