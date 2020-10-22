import * as actionTypes from '../constant/actionTypes';

const initialState = {
	loading: false,
	token: [],
	isSuccess: false
}

function rootReducer(state = initialState, action){
    switch (action.type) {
		case actionTypes.LOGIN_USER: 
			return{
				...state,
				token: action.payload.token,
				isSuccess: action.payload.success
			}
			default: return state;
	}
}

export default rootReducer;