import {combineReducers} from 'redux';

import loginReducers from './loginReducers';
import chatReducers from './chatReducers';
import usersReducers from './usersReducers'

export default combineReducers({
    loginReducers,
    chatReducers,
    usersReducers
})


