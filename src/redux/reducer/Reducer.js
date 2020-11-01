import * as actionTypes from "../constant/actionTypes";

const initialState = {
  loading: false,
  token: localStorage.getItem("token"),
  userData: [],
  isSuccess: false,
  productData: [],
  trigger: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        isSuccess: action.payload.success,
      };
    case actionTypes.GET_USER:
      return {
        ...state,
        userData: action.payload.user,
      };
    case actionTypes.EDIT_USER:
      return {
        ...state,
        userData: action.payload.data,
      };
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        userData: action.payload.user,
        token: action.payload.token,
      };
    case actionTypes.GET_PRODUCT_USER:
      return {
        ...state,
        productData: action.payload.product,
      };
    case actionTypes.SET_TRIGGER:
      return {
        ...state,
        trigger: !state.trigger,
      };
    case actionTypes.EDIT_PRODUCT:
      return {
        ...state,
        productData: action.payload.data,
      };
    case actionTypes.GET_REVIEW:
      return {
        ...state,
        review: action.payload.review,
      };
    default:
      return state;
  }
}

export default rootReducer;
