import SocketIO from 'socket.io';
import { Socket } from 'socket.io';
import { Messages } from '../clases/messages';
import { Message } from '../clases/message';
import { Users } from '../clases/users';
import { User } from '../clases/user';

export const messages = new Messages();
export const usersOnline = new Users();

export const message = (client: Socket, io: SocketIO.Server) => {
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

export const connectUser = (client: Socket,  io: SocketIO.Server) => {
    const user = new User(client.id);
    usersOnline.addUser(user);
}


export const disconnectUser = ( client: Socket, io: SocketIO.Server ) => {
    client.on('disconnect', () => {
        usersOnline.deleteUser( client.id );
        io.emit('active-users', usersOnline.getUsers());
    });
}

export const configUser = (client: Socket,  io: SocketIO.Server) => {
    client.on('config-user', (payload: { name: string } ) => {
        usersOnline.updateName(client.id, payload.name);
        io.emit('active-users', usersOnline.getUsers());
    })
}

export const getUsers = (client: Socket,  io: SocketIO.Server) => {
    client.on('get-users', () => {
        io.to( client.id ).emit('active-users', usersOnline.getUsers());
    })
} 


