import {
    FETCH_CREDIT,
    GET_ERRORS,
    BUY_CREDIT,
    GET_AGENT_FLOAT,
    GET_CUSTOMER_PAYMENTS,
    LOCK_CUSTOMER,
    FETCH_LOCKED_CUSTOMERS
} from '../actions/types';


const initialState = {
    credits: [],
    errors: {},
    buyCredit: {},
    agentFloat: '',
    customerPayments: {},
    lockCustomerMsg: {},
    lockedCustomers: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CREDIT:
            return {
                ...state,
                credits: action.payload
            }
            case BUY_CREDIT:
                console.log(action.payload)
                return {
                    ...state,
                    buyCredit: action.payload
                }
                case GET_ERRORS:
                    return {
                        ...state,
                        errors: action.payload
                    }
                    case GET_AGENT_FLOAT:
                        return {
                            ...state,
                            agentFloat: action.payload
                        }
                        case GET_CUSTOMER_PAYMENTS:
                            return {
                                ...state,
                                customerPayments: action.payload
                            };
                        case LOCK_CUSTOMER:
                            return {
                                ...state,
                                lockCustomerMsg: action.payload
                            };
                        case FETCH_LOCKED_CUSTOMERS:
                            return {
                                ...state,
                                lockedCustomers: action.payload
                            }
                            default:
                                return state;
    }
}