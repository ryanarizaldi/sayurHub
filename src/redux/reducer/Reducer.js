import * as actionTypes from "../constant/actionTypes";

const initialState = {
	loading: false,
	token: localStorage.getItem('token'),
	userData: [],
	isSuccess: false,
	productData: [],
	trigger: false
}

function rootReducer(state = initialState, action){
    switch (action.type) {
		case actionTypes.LOGIN_USER: 
			return{
				...state,
				token: action.payload.token,
				isSuccess: action.payload.success
			}
		case actionTypes.SET_LOADING:
			return{
				...state,
				loading: action.payload.loading
			}
		case actionTypes.GET_USER:
			return{
				...state,
				userData: action.payload.user,
				loading: action.payload.loading
			}
		case actionTypes.EDIT_USER:
			return{
				...state,
				userData: action.payload.data,
			}
		case actionTypes.USER_LOGOUT:
			return{
				...state,
				userData: action.payload.user,
				token: action.payload.token
			}
		case actionTypes.GET_PRODUCT_USER:
			return{
				...state,
				productData: action.payload.product
			}
		case actionTypes.SET_TRIGGER:
			return{
				...state,
				trigger: !state.trigger
			}
		case actionTypes.EDIT_PRODUCT:
			return{
				...state,
				productData: action.payload.data
			}
			default: return state;
	}

}

export default rootReducer;
