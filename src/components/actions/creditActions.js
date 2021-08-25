import {
    FETCH_CREDIT,
    GET_ERRORS,
    BUY_CREDIT,
    GET_AGENT_FLOAT,
    GET_CUSTOMER_PAYMENTS,
    LOCK_CUSTOMER,
    FETCH_LOCKED_CUSTOMERS,
} from "./types";
import { axios, createError } from "../../utils";
import Swal from "sweetalert2";

//Fetch Credit
export const fetchCredit = (page, limit) => (dispatch) => {
    let url = `agentcredits`;
    url += `?page=${page * limit}&limit=${limit}`;

    axios
        .get(url)
        .then((response) => {
            dispatch({
                type: FETCH_CREDIT,
                payload: response.data,
            });
        })
        .catch((err) => {
            dispatch(createError(err, GET_ERRORS));
        });
};

// Buy credit
export const buyCredit = (creditDetails) => (dispatch) => {
    let url = `agentcredits`;
    axios
        .post(url, creditDetails)
        .then((response) => {
            Swal.fire("Success", "Add the credit from your mpesa account", "success");
            dispatch({
                type: BUY_CREDIT,
                payload: response.data,
            });
        })
        .catch((err) => {
            console.group(err.response)
            Swal.fire("Error", "Please try again later", "error");
            dispatch(createError(err, GET_ERRORS));
        });
};

// get agent float
export const getAgentFloat = (agent_id) => (dispatch) => {
    let url = `agentcredits/float`;
    url += `?agent_id=${agent_id}`;
    axios
        .get(url)
        .then((response) => {
            dispatch({
                type: GET_AGENT_FLOAT,
                payload: response.data,
            });
        })
        .catch((err) => {
            // console.group(err.response)
            dispatch(createError(err, GET_ERRORS));
        });
};

// fetch customer payments
export const fetchCustomerPayments = (page, limit) => (dispatch) => {
    let url = `agents/allcustomers`;
    url += `?page=${page * limit}&limit=${limit}`;

    axios
        .get(url)
        .then((response) => {
            console.log(response.data);
            dispatch({
                type: GET_CUSTOMER_PAYMENTS,
                payload: response.data,
            });
        })
        .catch((err) => {
            // console.group(err.response)
            dispatch(createError(err, GET_ERRORS));
        });
};

// lock customer
export const lockCustomer = (customerDetails) => (dispatch) => {
    let url = `agents/lockCustomer`;

    axios
        .post(url, customerDetails)
        .then((response) => {
            Swal.fire("Success", response.data.message, "success");
            dispatch({
                type: LOCK_CUSTOMER,
                payload: response.data,
            });
        })
        .catch((err) => {
            // console.log(err.response);
            Swal.fire("Error", err.response.data.error.customer, "error");
            dispatch(createError(err, GET_ERRORS));
        });
};

// fetch locked customers
export const fetchLockedCustomers = (page, limit) => (dispatch) => {
    let url = `agents/lockedCustomers`;
    url += `?page=${page * limit}&limit=${limit}`;

    axios
        .get(url)
        .then((response) => {
            console.log(response.data);
            dispatch({
                type: FETCH_LOCKED_CUSTOMERS,
                payload: response.data,
            });
        })
        .catch((err) => {
            console.log(err.response);
            dispatch(createError(err, GET_ERRORS));
        });
};