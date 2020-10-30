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
					token: localStorage.getItem('token'),
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
		dispatch({
			type: actionTypes.SET_LOADING,
			payload: {
				loading: true
			}
		})
		try {
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
					user: submit.data.data,
					loading: false
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
				user: [],
				token: "",
			}
		})
	}
}


export const editUser = (values, id, state, onClose) => {
	return async (dispatch) => {
		const {full_name, description, email} = values;
		try{
			const token = localStorage.getItem('token');
			const fd = new FormData();
			fd.append('full_name', full_name);
			fd.append('description', description);
			fd.append('email', email);
			fd.append('profile_image', state);
			const submit = await axios({
						method: 'PUT',
						url: "https://pacific-oasis-23064.herokuapp.com/user/edit/" + id,
						data: fd,
						headers: {
								"Content-Type": "multipart/form-data",
								token : token
						},
					  });
			console.log(submit);
			dispatch({
				type: actionTypes.EDIT_USER,
				payload: {
					data: submit.data.data,
				}
			})
			onClose();
			Swal.fire({
                position: 'top-mid',
                icon: 'success',
                title: `Edit User Success`,
                showConfirmButton: false,
                timer: 1500
            });
		} catch(error){
			console.log("error", error.response);
			onClose();
			Swal.fire({
					title: "Edit Failed",
					text: error.response.data.message,
					icon: "error",
              });
		}	
	}
}


export const getProductById = (userId) => {
	return async dispatch => {
		try {
			const token = localStorage.getItem('token');
			const submit = await axios({
				method: "GET",
				url: "https://pacific-oasis-23064.herokuapp.com/products/user",
				headers: {
					token: token
				}
			})
			console.log(submit);
			dispatch({
				type: actionTypes.GET_PRODUCT_USER,
				payload: {
					product: submit.data.userProducts
				}
			})
		} catch (error) {
			console.log(error);
		}
	}
}
			
export const setTrigger = () => {
	return{
		type: actionTypes.SET_TRIGGER,
		payload: true
	}
}


export const editProduct = (values, id, state, onClose) => {
	return async (dispatch) => {
		console.log('clicked')
		const {product_name, description, category, discount, price, stock, weight } = values;
		try{
			const token = localStorage.getItem('token');
			const fd = new FormData();
			fd.append('product_name', product_name);
			fd.append('description', description);
			fd.append('category', category);
			fd.append('discount', discount);
			fd.append('price', price);
			fd.append('stock', stock);
			fd.append('weight', weight);
			fd.append('product_image', state);
			const submit = await axios({
						method: 'PUT',
						url: "https://pacific-oasis-23064.herokuapp.com/products/update/" + id ,
						data: fd,
						headers: {
								"Content-Type": "multipart/form-data",
								token : token
						},
					  });
			console.log(submit);
			dispatch({
				type: actionTypes.EDIT_PRODUCT,
				payload: {
					data: submit.data.data,
				}
			})
			onClose();
			Swal.fire({
                position: 'top-mid',
                icon: 'success',
                title: `Edit Product Success`,
                showConfirmButton: false,
                timer: 1500
            });
		} catch(error){
			console.log("error", error.response);
			onClose();
			Swal.fire({
					title: "Edit Failed",
					text: error.response.data.message,
					icon: "error",
              });
		}	
	}
}
