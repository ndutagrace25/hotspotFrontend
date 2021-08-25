import {
  FETCH_PACKAGES,
  GET_ERRORS,
  BUY_PACKAGE,
  FETCH_CUSTOMER_DETAILS,
  FETCH_CUSTOMER,
  AGENT_REGISTER_CUSTOMER,
  DISCONNECT_CUSTOMER,
} from "./types";
import { axios, createError } from "../../utils";
import Swal from "sweetalert2";

//Fetch Packages
export const fetchPackages = () => (dispatch) => {
  let url = `/packages`;
  return axios
    .get(url)
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: FETCH_PACKAGES,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch(createError(err, GET_ERRORS));
    });
};

// Buy package
export const buyPackage = (packageDetails) => (dispatch) => {
  let url = `payments/buystk`;
  axios
    .post(url, packageDetails)
    .then((response) => {
      Swal.fire("Success", response.data.message, "success");
      dispatch({
        type: BUY_PACKAGE,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err.response);

      dispatch(createError(err, GET_ERRORS));
    });
};

// fetch customer details
export const fetchCustomerDetails = () => (dispatch) => {
  let url = `customers/account`;

  axios
    .get(url)
    .then((response) => {
      dispatch({
        type: FETCH_CUSTOMER_DETAILS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch(createError(err, GET_ERRORS));
    });
};

// search customer
export const searchCustomer = (phone) => (dispatch) => {
  let url = `agents/customer`;
  if (phone !== "") {
    url += `?phone=${phone}`;
  }
  axios
    .get(url)
    .then((response) => {
      console.log(response.data);
      if (response.data === null) {
        Swal.fire("Error", "Customer not found", "error");
      }
      dispatch({
        type: FETCH_CUSTOMER,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      Swal.fire("Error", "Customer not found", "error");
      dispatch(createError(err, GET_ERRORS));
    });
};

// Admin Buy package
export const buyPackageAgent = (packageDetails) => (dispatch) => {
  let url = `agents/payment`;
  axios
    .post(url, packageDetails)
    .then((response) => {
      Swal.fire(
        "Success",
        "You have successfully purchased a package",
        "success"
      );
      dispatch({
        type: BUY_PACKAGE,
        payload: response.data,
      });
    })
    .catch((err) => {
      // console.log(err.response)
      Swal.fire("Error", err.response.data.error, "error");

      dispatch(createError(err, GET_ERRORS));
    });
};

// Agent register customer
export const agentRegisterCustomer = (customerDetails) => (dispatch) => {
  let url = `agents/addcustomer`;
  axios
    .post(url, customerDetails)
    .then((response) => {
      Swal.fire("Success", "Customer added successful", "success");
      dispatch({
        type: AGENT_REGISTER_CUSTOMER,
        payload: response.data,
      });
    })
    .catch((err) => {
      // console.log(err.response.data);
      Swal.fire("Error", err.response.data.error, "error");
      dispatch(createError(err, GET_ERRORS));
    });
};

// disconnect customer
export const disconnectCustomer = (access_code) => (dispatch) => {
  // console.log(access_code);
  let url = `customers/disconnectSingle`;
  url += `?access_code=${access_code}`;
  axios
    .get(url)
    .then((response) => {
      // console.log(response.data);
      dispatch({
        type: DISCONNECT_CUSTOMER,
        payload: response.data,
      });
    })
    .catch((err) => {
      // console.log(err.response)
      dispatch(createError(err, GET_ERRORS));
    });
};
