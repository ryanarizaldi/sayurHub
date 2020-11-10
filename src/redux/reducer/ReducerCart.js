import * as actionTypes from "../constant/actionTypes";

const initialState = {
	cart: [],
	loading: false,
	totalPrice: 0,
	totalPriceCart: 0,
	quantity: 1
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.ADD_TO_CART:
			return {
				...state,
				loading: action.payload.loading,
			}
		case actionTypes.ADD_QUANTITY:
			return {
				...state,
				quantity: state.quantity + action.payload.quantity,
				totalPriceCart: state.quantity * action.payload.totalPrice
				
			}
		case actionTypes.REDUCE_QUANTITY:
			return {
				...state,
				quantity: state.quantity - action.payload.quantity,
				totalPriceCart: state.quantity * action.payload.totalPrice
			}
		case actionTypes.SET_LOADING_CART:
			return {
				...state,
				loading: action.payload.loading
			}
		case actionTypes.GET_CART:
			return {
				...state,
				loading: action.payload.loading,
				cart: action.payload.data,
				totalPrice: action.payload.totalPrice	
			}
		default:
			return state;
	}
}

export default rootReducer;