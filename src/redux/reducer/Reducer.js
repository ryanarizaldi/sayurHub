import * as actionTypes from "../constant/actionTypes";

const initialState = {
  loading: false,
  token: localStorage.getItem("token"),
  tokenAdmin: localStorage.getItem("tokenAdmin"),
  userData: [],
  isSuccess: false,
  productData: [],
  trigger: false,
  review: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        isSuccess: action.payload.success,
		loading: action.payload.loading
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case actionTypes.GET_USER:
      return {
        ...state,
        userData: action.payload.user,
        loading: action.payload.loading,
      };
    case actionTypes.EDIT_USER:
      return {
        ...state,
		loading: action.payload.loading,
		trigger: true
      };
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        userData: action.payload.user,
        token: action.payload.token,
        tokenAdmin: action.payload.tokenAdmin,
        isSuccess: action.payload.isSuccess,
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
        loading: action.payload.loading,
      };
    case actionTypes.LOGIN_ADMIN:
      return {
        ...state,
        tokenAdmin: action.payload.tokenAdmin,
        isSuccess: action.payload.success,
      };
    case actionTypes.GET_ADMIN:
      return {
        ...state,
        userData: action.payload.user,
      };
    default:
      return state;
  }
}

export default rootReducer;
