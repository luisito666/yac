import {INGRESAR} from '../types/loginTypes'

export const Ingresar = (payload: any) => (dispatch: any) => {
    dispatch({
        type: INGRESAR,
        payload: payload
    });
}

