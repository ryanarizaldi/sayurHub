import * as actionTypes from "../constant/actionTypes";

const initialState = {
	loading: false,
	discussion: [],
	reply: [],
	loadingAdd: false,
	trigger: 0
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.LOADING_DISCUSSION:
			return {
				...state,
				loading: action.payload.loading
			}
		case actionTypes.LOADING_ADD:
			return {
				...state,
				loadingAdd: action.payload.loading
			}
		case actionTypes.GET_DISCUSSION:
			return {
				...state,
				loading: action.payload.loading,
				discussion: action.payload.data
			}
		case actionTypes.ADD_DISCUSSION:
			return {
				...state,
				loadingAdd: action.payload.loading,
				trigger: state.trigger + 1
			}
		case actionTypes.EDIT_DISCUSSION:
			return {
				...state,
				loadingAdd: action.payload.loading,
				discussion: action.payload.data,
				trigger: state.trigger + 1
			}
		case actionTypes.DELETE_DISCUSSION:
			return {
				...state,
				trigger: state.trigger + 1
			}
		case actionTypes.GET_REPLY:
			return {
				...state,
				loading: action.payload.loading,
				reply: action.payload.data
			}
		case actionTypes.ADD_REPLY_ADMIN:
			return {
				...state,
				loadingAdd: action.payload.loading,
				trigger: state.trigger + 1
			}
		case actionTypes.ADD_REPLY_USER:
			return {
				...state,
				loadingAdd: action.payload.loading,
				trigger: state.trigger + 1
			}
		case actionTypes.EDIT_REPLY_ADMIN:
			return {
				...state,
				trigger: state.trigger + 1
			}
		case actionTypes.EDIT_REPLY_USER:
			return {
				...state, 
				trigger: state.trigger + 1
			}
		case actionTypes.DELETE_REPLY_ADMIN: 
			return {
				...state,
				trigger: state.trigger + 1
			}
		case actionTypes.DELETE_REPLY_USER: 
			return {
				...state,
				trigger: state.trigger + 1
			}
		default:
			return state;
	}
}

export default rootReducer;