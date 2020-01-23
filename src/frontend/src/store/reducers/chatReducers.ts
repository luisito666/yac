import { MESSAGE, MESSAGES } from '../types/chatTypes'
import { Action } from '../../models'

const INITIAL_STATE = {
    messages: []
}

export default (state = INITIAL_STATE, action: Action) => {
    switch(action.type){
        case MESSAGE:
            return {...state, messages: [...state.messages, action.payload]}
        
        case MESSAGES:
            return {...state, messages: action.payload}
        default: return state
    }
}
