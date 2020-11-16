import * as actionTypes from "../constant/actionTypes";
import axios from "axios";
import Swal from "sweetalert2";
import qs from "qs";


export const getDiscussion = (productId) => {
	return async dispatch => {
		dispatch({
			type: actionTypes.LOADING_DISCUSSION,
			payload: {
				loading: true
			}
		})
		try {
			const get = await axios({
				method: "GET",
				url: "https://pacific-oasis-23064.herokuapp.com/discussion/" + productId,
			})
			console.log(get);
			dispatch({
				type: actionTypes.GET_DISCUSSION,
				payload: {
					loading: false,
					data: get.data.data
				}
			})
		} catch (error) {
			console.log(error);
		}
	}
}


export const getReply = (discussionId) => {
	return async dispatch => {
		dispatch({
			type: actionTypes.LOADING_DISCUSSION,
			payload: {
				loading: true
			}
		})
		try {
			const get = await axios({
				method: "GET",
				url: "https://pacific-oasis-23064.herokuapp.com/reply/" + discussionId
			})
			console.log(get);
			dispatch({
				type: actionTypes.GET_REPLY,
				payload: {
					loading: false,
					data: get.data.data
				}
			})
		} catch (error) {
			console.log(error);
		}
	}
}

export const addDiscussion = (productId, values, onClose) => {
	return async dispatch => {
		dispatch({
			type: actionTypes.LOADING_ADD,
			payload: {
				loading: true
			}
		})
		try {
			const token = localStorage.getItem("token");
			const { write } = values;
			const data = qs.stringify({
        		write: write,
      		});
			const submit = await axios({
				method: "POST",
				url:  "https://pacific-oasis-23064.herokuapp.com/discussion/create/" + productId,
				data: data,
				headers: {
					token: token
				}
			})
			dispatch({
				type: actionTypes.ADD_DISCUSSION,
				payload: {
					data: submit,
					loading: false
				}
			})
			Swal.fire({
			  position: "top-mid",
			  icon: "success",
			  title: `Add Discussion Success`,
			  showConfirmButton: false,
			  timer: 1500,
			});
			onClose();
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Add Discussion Failed",
				text: error.response,
				icon: "error",
			});
		}
	}
}


export const editDiscussion = (discussionId, values) => {
	return async dispatch => {
		dispatch({
			type: actionTypes.LOADING_ADD,
			payload: {
				loading: true
			}
		})
		try {
			const token = localStorage.getItem("token") ? localStorage.getItem("token") : localStorage.getItem("tokenAdmin")
			const { write } = values;
			const data = qs.stringify({
				write: write
			})
			const submit = await axios({
				method: "PUT",
				url: "https://pacific-oasis-23064.herokuapp.com/discussion/edit/" + discussionId,
				data: data,
				headers: {
					token: token
				}
			})
			console.log(submit);
			dispatch({
				type: actionTypes.EDIT_DISCUSSION,
				payload: {
					data: submit,
					loading: false
				}
			})
			Swal.fire({
			  position: "top-mid",
			  icon: "success",
			  title: `Edit Discussion Success`,
			  showConfirmButton: false,
			  timer: 1500,
			});
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Add Discussion Failed",
				text: error.response,
				icon: "error",
			});
		}
	}
}


export const deleteDiscussion = (discussionId) => {
	return async dispatch => {
		try {
			const token = localStorage.getItem("token") ? localStorage.getItem("token") : localStorage.getItem("tokenAdmin")
    		const remove = await axios({
        		method: "delete",
        		url: `https://pacific-oasis-23064.herokuapp.com/discussion/delete/${discussionId}`,
        		headers: {
            		token: token
       	 		}
      	 	})
			dispatch({
				type: actionTypes.DELETE_DISCUSSION,
				payload: {
					data: remove
				}
			})
      	 	console.log("remove response", remove);
    		} catch (error) {
			console.log(error);
		}
 	}
}
   

export const addReplyAdmin = (discussionId, values) => {
	return async dispatch => {
		dispatch({
			type: actionTypes.LOADING_DISCUSSION,
			payload: {
				loading: true
			}
		})
		try {
			const tokenAdmin = localStorage.getItem('tokenAdmin');
			const { reply } = values;
			const data = qs.stringify({
				reply: reply
			})
			const submit = await axios({
				method: "POST",
				url: "https://pacific-oasis-23064.herokuapp.com/reply/add/" + discussionId,
				data: data,
				headers: {
					token: tokenAdmin
				}
			})
			dispatch({
				type: actionTypes.ADD_REPLY_ADMIN,
				payload: {
					loading: false,
					data: submit
				}
			})
			Swal.fire({
			  position: "top-mid",
			  icon: "success",
			  title: `Add Reply Success`,
			  showConfirmButton: false,
			  timer: 1500,
			});
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Add Reply Failed",
				text: error.response,
				icon: "error",
			});
		}
	}
}

export const addReplyUser = (discussionId, values) => {
	return async dispatch => {
		dispatch({
			type: actionTypes.LOADING_DISCUSSION,
			payload: {
				loading: true
			}
		})
		try {
			const token = localStorage.getItem('token');
			console.log("ini token" + token)
			const { reply } = values;
			const data = qs.stringify({
				reply: reply
			})
			const submit = await axios({
				method: "POST",
				url: "https://pacific-oasis-23064.herokuapp.com/reply/user/create/" + discussionId,
				data: data,
				headers: {
					token: token
				}
			})
			dispatch({
				type: actionTypes.ADD_REPLY_USER,
				payload: {
					loading: false,
					data: submit
				}
			})
			Swal.fire({
			  position: "top-mid",
			  icon: "success",
			  title: `Add Reply Success`,
			  showConfirmButton: false,
			  timer: 1500,
			});
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Add Reply Failed",
				text: error.response,
				icon: "error",
			});
		}
	}
}


export const deleteReplyAdmin = (replyId) => {
	return async dispatch => {
		try {
    		const remove = await axios({
        		method: "delete",
        		url: `https://pacific-oasis-23064.herokuapp.com/reply/delete/${replyId}`,
        		headers: {
            		token: localStorage.getItem("tokenAdmin"),
       	 		}
      	 	})
			dispatch({
				type: actionTypes.DELETE_REPLY_ADMIN,
				payload: {
					data: remove
				}
			})
      	 	console.log("remove response", remove);
    		} catch (error) {
			console.log(error);
		}
 	}
}

export const deleteReplyUser = (replyId) => {
	return async dispatch => {
		try {
    		const remove = await axios({
        		method: "delete",
        		url: `https://pacific-oasis-23064.herokuapp.com/reply/user/delete/${replyId}`,
        		headers: {
            		token: localStorage.getItem("token"),
       	 		}
      	 	})
			dispatch({
				type: actionTypes.DELETE_REPLY_USER,
				payload: {
					data: remove
				}
			})
      	 	console.log("remove response", remove);
    		} catch (error) {
			console.log(error);
		}
 	}
}

export const editReplyUser = (replyId, values, editChange) => {
	return async dispatch => {
		dispatch({
			type: actionTypes.LOADING_ADD,
			payload: {
				loading: true
			}
		})
		try {
			const token = localStorage.getItem("token");
			const { reply } = values;
			const data = qs.stringify({
				reply: reply
			})
			const submit = await axios({
				method: "PUT",
				url: "https://pacific-oasis-23064.herokuapp.com/reply/user/edit/" + replyId,
				data: data,
				headers: {
					token: token
				}
			})
			console.log(submit);
			dispatch({
				type: actionTypes.EDIT_REPLY_USER,
				payload: {
					data: submit,
					loading: false
				}
			})
			editChange()
			Swal.fire({
			  position: "top-mid",
			  icon: "success",
			  title: `Edit Reply Success`,
			  showConfirmButton: false,
			  timer: 1500,
			});
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Edit Reply Failed",
				text: error.response,
				icon: "error",
			});
		}
	}
}


export const editReplyAdmin = (replyId, values, editChange) => {
	return async dispatch => {
		dispatch({
			type: actionTypes.LOADING_ADD,
			payload: {
				loading: true
			}
		})
		try {
			const tokenAdmin = localStorage.getItem("tokenAdmin");
			const { reply } = values;
			const data = qs.stringify({
				reply: reply
			})
			const submit = await axios({
				method: "PUT",
				url: "https://pacific-oasis-23064.herokuapp.com/reply/edit/" + replyId,
				data: data,
				headers: {
					token: tokenAdmin
				}
			})
			console.log(submit);
			dispatch({
				type: actionTypes.EDIT_REPLY_ADMIN,
				payload: {
					data: submit,
					loading: false
				}
			})
			editChange();
			Swal.fire({
			  position: "top-mid",
			  icon: "success",
			  title: `Edit Reply Success`,
			  showConfirmButton: false,
			  timer: 1500,
			});
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Edit Reply Failed",
				text: error.response,
				icon: "error",
			});
		}
	}
}



