import {INGRESAR} from '../types/loginTypes';

export const Ingresar = (payload: any) => (dispatch: any) => {
    
    localStorage.setItem('user', JSON.stringify(payload));
    
    dispatch({
        type: INGRESAR,
        payload: payload
    });
}

