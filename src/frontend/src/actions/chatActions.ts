import { MENSAJE } from '../types/chatTypes';
import { INGRESAR } from '../types/loginTypes'
import { socket } from '../socket'

export const Broadcast = (mensaje: any, usuario: any) => (dispatch: any) => {
    // Usar el socket para emitir el mensaje y agregar los mensajes al state
    
    const payload = {mensaje, de: usuario };

    if (payload.mensaje.startsWith('/youtube')) {
        const tube = payload.mensaje.split(' ');
        const new_payload = {
            de: payload.de,
            mensaje: null,
            youtube: tube[1]
        }
        socket.emit('mensaje', payload);

        dispatch({
            type: MENSAJE,
            payload: new_payload
        })

        return
    }

    socket.emit('mensaje', payload);

    dispatch({
        type: MENSAJE,
        payload: payload
    })
}

export const Listen = () => (dispatch: any) => {

    const user = localStorage.getItem('user');
    
    if (user) {
        dispatch({
            type: INGRESAR,
            payload: JSON.parse(user)
        })
    }


    socket.on('mensaje', (payload: any) => {
        console.log(payload);
        dispatch({
            type: MENSAJE,
            payload
        })
    })
}


