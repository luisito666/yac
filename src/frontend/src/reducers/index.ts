import {combineReducers} from 'redux';

import loginReducers from './loginReducers';
import chatReducers from './chatReducers';

export default combineReducers({
    loginReducers,
    chatReducers
})


