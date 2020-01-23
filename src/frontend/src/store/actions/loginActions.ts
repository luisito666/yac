import axios  from 'axios'
import {SIGNIN} from '../types/loginTypes';
import { socket } from '../../sockets'


const httpReques = (user: any) => {
    return axios.get(`http://192.168.0.10:5000/user/${user}`);
}


export const Signin = (payload: any) => (dispatch: any) => {

    httpReques(payload)
        .then( ({data}) => {
            if (data.user) {
                return;
            } else {
                
                socket.emit('config-user', {name: payload});
  
                localStorage.setItem('user', JSON.stringify(payload));
                
                dispatch({
                    type: SIGNIN,
                    payload: payload
                });
            }
    });
    
    
}

export const LogOut = () => (dispatch: any) => {
    
    localStorage.removeItem('user');

    socket.disconnect();
    
    dispatch({
        type: SIGNIN,
        payload: ''
    })
}

export const LoadUserStorage = () => (dispatch: any) => {
    
    const user = localStorage.getItem('user');

    if (user) {

        const parseUser = JSON.parse(user)

        socket.emit('config-user', {name: parseUser})

        dispatch({
            type: SIGNIN,
            payload: parseUser
        })
    }
}
