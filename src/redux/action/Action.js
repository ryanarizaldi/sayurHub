import * as actionTypes from '../constant/actionTypes';
import axios from 'axios';
import qs from 'qs';
import Swal from 'sweetalert2';

export const loginUser = (values) => {
    return async (dispatch) => {
		const {email, password} = values;
		try{
			const dataLogin = qs.stringify({
                email: email,
                password: password
              })
			const post = await axios({
                method: "post",
                url: "https://pacific-oasis-23064.herokuapp.com/user/login",
                data: dataLogin,
                headers: 
					{
              		"content-Type": "application/x-www-form-urlencoded",
                	}
            	})
            console.log(post.data);
            Swal.fire({
                position: 'top-mid',
                icon: 'success',
                title: `Login Success, Welcome`,
                showConfirmButton: false,
                timer: 1500
            });
			localStorage.setItem('token', post.data.token);
			dispatch({
				type: actionTypes.LOGIN_USER,
				payload: {
					token: post.data.token,
					success: true
				}
			})
			} catch (error){
				console.log("error", error.response);
            	Swal.fire({
					title: "Login Failed",
					text: error.response.data.message,
					icon: "error",
              });
			}
		}
	};

export const getUser = () => {
	return async dispatch => {
		try{
			const token = localStorage.getItem('token');
			const submit = await axios({
				method: "GET",
				url: "https://pacific-oasis-23064.herokuapp.com/user/id",
				headers: {
					token: token
				}
			})
			console.log(submit);
			localStorage.setItem('user', submit.data.data);
			dispatch({
				type: actionTypes.GET_USER,
				payload: {
					user: submit.data.data
				}
			})
		} catch (error) {
			console.log(error);
		}
	}
}

export const logout = () => {
	return dispatch => {
		localStorage.clear();
		Swal.fire({
                	position: 'top-mid',
                	icon: 'success',
                	title: `Logout Success`,
                	showConfirmButton: false,
                	timer: 1500
              	});
		dispatch({
			type: actionTypes.USER_LOGOUT,
			payload: {
				user: []
			}
		})
	}
}