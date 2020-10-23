import * as actionTypes from '../constant/actionTypes';

const initialState = {
	loading: false,
	token: [],
	userData: [],
	isSuccess: false,
	user: [] ? localStorage.getItem('user') : []
}

function rootReducer(state = initialState, action){
    switch (action.type) {
		case actionTypes.LOGIN_USER: 
			return{
				...state,
				token: action.payload.token,
				isSuccess: action.payload.success
			}
		case actionTypes.GET_USER:
			return{
				...state,
				userData: action.payload.user
			}
		case actionTypes.USER_LOGOUT:
			return{
				...state,
				userData: action.payload.user
			}
			default: return state;
	}
}

export default rootReducer;