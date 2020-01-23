import SocketIO from 'socket.io';
import { Socket } from 'socket.io';
import { Messages } from '../clases/messages';
import { Message } from '../clases/message';

export const messages = new Messages();

export const mensaje = (client: Socket, io: SocketIO.Server) => {
    client.on('messages', (payload: Message) => {

        console.log(payload);
        
        if(payload.message.startsWith('/youtube')){
            const tube = payload.message.split(' ');
            const new_payload: Message = {
                from: payload.from,
                message: null,
                youtube: tube[1],
                date: payload.date
            }
            client.broadcast.emit('messages', new_payload)
            messages.addMessage(new_payload)
            return
        }
        messages.addMessage(payload)
        client.broadcast.emit('messages', {...payload, youtube: null})
    })
    
}   


