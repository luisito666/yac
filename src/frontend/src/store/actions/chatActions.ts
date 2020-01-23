import { MESSAGE, MESSAGES } from '../types/chatTypes';
import { Message } from '../../models'
import { socket } from '../../sockets';
import axios from 'axios';

export const Broadcast = (message: string, from: string) => (dispatch: any) => {
    // Usar el socket para emitir el mensaje y agregar los mensajes al state

    const event = new Date()
    
    const payload: Message = {message, from, date: event.toLocaleString('es-CO') };

    if (payload.message.startsWith('/youtube')) {
        const tube = payload.message.split(' ');
        const new_payload: Message = {
            from: payload.from,
            message: null,
            youtube: tube[1],
            date: payload.date
        }
        socket.emit('messages', payload);

        dispatch({
            type: MESSAGE,
            payload: new_payload
        })

        return
    }

    socket.emit('messages', payload);

    dispatch({
        type: MESSAGE,
        payload: payload
    })
}

export const Listen = () => (dispatch: any) => {
    
    socket.removeAllListeners();

    socket.on('messages', (payload: any) => {
        console.log(payload);
        dispatch({
            type: MESSAGE,
            payload
        })
    })
}

export const Close = () => () => {
    // socket.disconnect();
}

export const LoadMessages = () => (dispatch: any) => {
    axios.get('http://192.168.0.10:5000/messages')
        .then( ({data}) => {
            
            const { messages } = data;
            dispatch({
                type: MESSAGES,
                payload: messages
            });

        });
}

