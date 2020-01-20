import SocketIO from 'socket.io';
import { Socket } from 'socket.io';


export const mensaje = (client: Socket, io: SocketIO.Server) => {
    client.on('mensaje', (payload: {mensaje: string, de: string}) => {
        
        if(payload.mensaje.startsWith('/youtube')){
            const tube = payload.mensaje.split(' ');
            const new_payload = {
                de: payload.de,
                mensaje: null,
                youtube: tube[1]
            }
            client.broadcast.emit('mensaje', new_payload)
            return
        }
        
        client.broadcast.emit('mensaje', {...payload, youtube: null})
    })
    
}   


