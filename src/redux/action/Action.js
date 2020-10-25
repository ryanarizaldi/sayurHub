import * as actionTypes from "../constant/actionTypes";
import axios from "axios";
import qs from "qs";
import Swal from "sweetalert2";

export const loginUser = (values) => {
  return async (dispatch) => {
    const { email, password } = values;
    try {
      const dataLogin = qs.stringify({
        email: email,
        password: password,
      });
      const post = await axios({
        method: "post",
        url: "https://pacific-oasis-23064.herokuapp.com/user/login",
        data: dataLogin,
        headers: {
          "content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log(post.data);
      localStorage.setItem("token", post.data.token);
      Swal.fire({
        position: "top-mid",
        icon: "success",
        title: `Login Success, Welcome`,
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch({
        type: actionTypes.LOGIN_USER,
        payload: {
          token: post.data.token,
          success: true,
        },
      });
    } catch (error) {
      console.log("error", error.response);
      Swal.fire({
        title: "Login Failed",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };
};
