import { SIGNIN } from '../types/loginTypes';
import { Action } from '../../models';


const INITIAL_STATE = {
    username: null
}

export default (state = INITIAL_STATE, action: Action) => {
    switch(action.type){
        case SIGNIN:
            return {...state, username: action.payload}
        default: return state;
    }
}
