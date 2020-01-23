import { USERLOAD } from '../types/usersTypes';
import { Action } from '../../models';


const INITIAL_STATE = {
    users: []
}

export default (state = INITIAL_STATE, action: Action) => {
    switch(action.type){
        case USERLOAD:
            return {...state, users: action.payload}
        default: return state
    }
}