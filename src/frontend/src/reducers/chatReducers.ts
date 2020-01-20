import { MENSAJE } from '../types/chatTypes'


const INITIAL_STATE = {
    mensaje: []
}

interface Action {
    type: string;
    payload: any
}


export default (state = INITIAL_STATE, action: Action) => {
    switch(action.type){
        case MENSAJE:
            return {...state, mensaje: [...state.mensaje, action.payload]}
        default: return state
    }
}