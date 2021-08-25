import isEmpty from '../../validation/is-empty';
import {
    SET_CURRENT_PERSONNEL,
    SET_CURRENT_AGENT,
    GET_OTP,
    RESET_PASSWORD
} from '../actions/types';
import {
    act
} from 'react-dom/test-utils';

const initialState = {
    isAuthenticated: false,
    personnel: {},
    agent: {},
    otp: {},
    password: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_PERSONNEL:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                    personnel: action.payload,
                    isOnline: action.authorized
            };
        case SET_CURRENT_AGENT:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                    agent: action.payload
            };

        case GET_OTP:
            return {
                ...state,
                otp: action.payload
            };

        case RESET_PASSWORD:
            return {
                ...state,
                password: action.payload
            }

            default:
                return state;
    }
}