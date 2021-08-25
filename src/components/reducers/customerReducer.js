import {
    FETCH_PACKAGES,
    GET_ERRORS,
    BUY_PACKAGE,
    FETCH_CUSTOMER_DETAILS,
    FETCH_CUSTOMER,
    AGENT_REGISTER_CUSTOMER,
    DISCONNECT_CUSTOMER,
} from '../actions/types';


const initialState = {
    packages: [],
    errors: {},
    buyPackage: {},
    customerDetails: {},
    customerSearched: {},
    registerCustomer: {},
    disconnectCustomer: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PACKAGES:
            return {
                ...state,
                packages: action.payload
            }
            case BUY_PACKAGE:
                return {
                    ...state,
                    buyPackage: action.payload
                }
                case GET_ERRORS:
                    return {
                        ...state,
                        errors: action.payload
                    }
                    case FETCH_CUSTOMER_DETAILS:
                        return {
                            ...state,
                            customerDetails: action.payload
                        }
                        case FETCH_CUSTOMER:
                            return {
                                ...state,
                                customerSearched: action.payload
                            }
                            case AGENT_REGISTER_CUSTOMER:
                                return {
                                    ...state,
                                    registerCustomer: action.payload
                                }
                                case DISCONNECT_CUSTOMER:
                                    return {
                                        ...state,
                                        disconnectCustomer: action.payload
                                    }
                                    
                                        default:
                                            return state;
    }
}