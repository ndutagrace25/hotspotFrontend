import {
    combineReducers
} from 'redux';
import errorReducer from './errorReducer';
import profileReducer from './customerReducer';
import authReducer from './authReducer';
import creditReducer from './creditReducer';


export default combineReducers({
    errors: errorReducer,
    packages: profileReducer,
    auth: authReducer,
    credits: creditReducer
});