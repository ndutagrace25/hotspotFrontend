import setAuthToken from "../../utilities/setAuthToken";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

import {
  axios,
  createError
} from "../../utils";
import {
  SET_CURRENT_PERSONNEL,
  SET_CURRENT_AGENT,
  GET_ERRORS,
  GET_OTP,
  RESET_PASSWORD,
} from "./types";

// authorize customer to view data balance profile
export const authorizeUser = (accessCode) => (dispatch) => {
  // console.log(accessCode)
  let url = `customers/authorize`;
  axios
    .post(url, accessCode)
    .then((response) => {
      const {
        accessToken,
        authorized
      } = response.data;

      //set token to local storage
      localStorage.setItem("jwtToken", accessToken);
      //set token to auth header
      setAuthToken(accessToken);
      //decode token to get user data
      const decoded = jwt_decode(accessToken);
      //set current user
      dispatch({
        type: SET_CURRENT_PERSONNEL,
        payload: decoded,
        authorized: authorized,
      });
    })
    .catch((err) => {
      // console.log(err.response.data.error.customer)
      Swal.fire("Error", err.response.data.error.customer, "error");
      dispatch(createError(err, GET_ERRORS));
    });
};

//set current user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_PERSONNEL,
    payload: decoded,
  };
};

//set current user
export const setCurrentAgent = (decoded) => {
  return {
    type: SET_CURRENT_AGENT,
    payload: decoded,
  };
};

// login admin
export const loginAgent = (userDetails) => (dispatch) => {
  let url = `agents/login`;
  axios
    .post(url, userDetails)
    .then((response) => {
      const {
        accessToken
      } = response.data;

      //set token to local storage
      localStorage.setItem("agentJwtToken", accessToken);
      //set token to auth header
      setAuthToken(accessToken);
      //decode token to get user data
      const decoded = jwt_decode(accessToken);
      //set current user
      dispatch(setCurrentAgent(decoded));
    })
    .catch((err) => {
      // console.log(err.response);
      dispatch(createError(err, GET_ERRORS));
    });
};

//log out Agent
export const logoutAgent = () => (dispatch) => {
  //remove token from local storage
  localStorage.removeItem("agentJwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  //set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// send OTP for reset password
export const getOTP = (phone) => (dispatch) => {
  let url = `agents/reset_password`;

  axios
    .patch(url, phone)
    .then((response) => {
      Swal.fire("Success", response.data.message, "success");
      dispatch({
        type: GET_OTP,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      if (
        err.response.data.error.password ===
        "Please request an admin permission to reset your password"
      ) {
        Swal.fire("Error", err.response.data.error.password, "error");
      } else {
        Swal.fire("Error", err.response.data.error, "error");
      }
      dispatch(createError(err, GET_ERRORS));
    });
};

// send OTP for reset password
export const resetPassword = (passwordDetails, history) => (dispatch) => {
  let url = `agents/confirm_reset_password`;

  axios
    .patch(url, passwordDetails)
    .then((response) => {
      Swal.fire("Success", response.data.message, "success");
      history.push("/agentLogin");
      dispatch({
        type: RESET_PASSWORD,
        payload: response.data,
      });
    })
    .catch((err) => {
      Swal.fire("Error", err.response.data.error, "error");
      dispatch(createError(err, GET_ERRORS));
    });
};