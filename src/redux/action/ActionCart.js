import * as actionTypes from "../constant/actionTypes";
import axios from "axios";
import Swal from "sweetalert2";

export const addQuantity = (price) => {
  return {
    type: actionTypes.ADD_QUANTITY,
    payload: {
      totalPrice: price,
    },
  };
};

export const addTotalPrice = (total) => {
  return {
    type: actionTypes.ADD_TOTAL_PRICE,
    payload: {
      total: total,
    },
  };
};

export const reduceQuantity = (price) => {
  return {
    type: actionTypes.REDUCE_QUANTITY,
    payload: {
      quantity: 1,
      totalPrice: price,
    },
  };
};

export const addToCart = (id) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SET_LOADING_CART,
      payload: {
        loading: true,
      },
    });
    try {
      const token = localStorage.getItem("token");
      const submit = await axios({
        method: "POST",
        url: "https://pacific-oasis-23064.herokuapp.com/cart/add/" + id,
        headers: {
          token: token,
        },
      });
      Swal.fire({
        position: "top-mid",
        icon: "success",
        title: `Add To Cart Success`,
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
          loading: false,
          data: submit,
        },
      });
    } catch (error) {
      Swal.fire({
        title: "Add To Cart Failed",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };
};

export const getCart = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SET_LOADING_CART,
      payload: {
        loading: true,
      },
    });
    try {
      const token = localStorage.getItem("token");
      const get = await axios({
        method: "GET",
        url: "https://pacific-oasis-23064.herokuapp.com/cart/view",
        headers: {
          token: token,
        },
      });
      let total = 0;
      get.data.cart.items.map((item, i) => {
        let multiplied = item.price * item.quantity;
        return (total += multiplied);
      });
      console.log(get.data.cart);
      dispatch({
        type: actionTypes.GET_CART,
        payload: {
          loading: false,
          data: get.data.cart,
          totalPrice: total,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
