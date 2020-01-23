import {SIGNIN} from '../types/loginTypes';

export const Signin = (payload: any) => (dispatch: any) => {
    
    localStorage.setItem('user', JSON.stringify(payload));
    
    dispatch({
        type: SIGNIN,
        payload: payload
    });
}

export const LogOut = () => (dispatch: any) => {
    dispatch({
        type: SIGNIN,
        payload: null
    })
}

export const LoadUserStorage = () => (dispatch: any) => {
    
    const user = localStorage.getItem('user');

    if (user) {
        dispatch({
            type: SIGNIN,
            payload: JSON.parse(user)
        })
    }
}
