import { INGRESAR } from '../types/loginTypes'

const INITIAL_STATE = {
    username: null
}

interface Action {
    type: string;
    payload: any
}

export default (state = INITIAL_STATE, action: Action) => {
    switch(action.type){
        case INGRESAR:
            return {...state, username: action.payload}
        default: return state
    }
}