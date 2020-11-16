import React, {useState, useEffect} from 'react';
import styles from './EditReply.module.css';
import { connect } from 'react-redux';

import { useFormik } from "formik";
import * as actionTypesDiscussion from '../../redux/action/ActionDiscussion';
import * as Yup from "yup";
import azanirr from '../../assets/img/azanirr.jpg';

const schemaEdit = Yup.object().shape({
		 reply: Yup.string()
			.min(5, "Reply must be 5 characters at minimum")
	});



function EditReply (props) {
	
	const { editReplyAdmin, editReplyUser, reply, user, editChange } = props;
	
	const [token] = useState(localStorage.getItem('token')),
		  [tokenAdmin] = useState(localStorage.getItem('tokenAdmin'));
	
	const formik = useFormik({
		initialValues: {
			reply: reply.reply
		},
		onSubmit: values => {
          if(tokenAdmin){
			  editReplyAdmin(reply._id, values, editChange)
		  } else if (token){
			  editReplyUser(reply._id, values, editChange)
		  }
        },
		validationSchema: schemaEdit
	})
	
	
	return (
		<>
			<form className={styles.Form} onSubmit={formik.handleSubmit}>
				<input
					className={
						formik.touched.reply && formik.errors.reply
						  ? styles.ErrorInput
						  : null }
					value={formik.values.reply}
					onBlur={formik.handleBlur} 
					onChange={formik.handleChange}
					name="reply"
					id="reply"
					type="text"></input>
					{formik.touched.reply && formik.errors.reply ? (
					<div className={styles.ErrorMsg}>{formik.errors.reply}</div>
					) : null}
				<div className={styles.Submit}>
					<button onClick={() => editChange()}>CANCEL</button>
					<button type="submit">SEND</button>
				</div>
		</form>
	</>
	)
}

const mapStateToProps = state => {
	return {
		user: state.index.userData
	}
}


const mapDispatchToProps = dispatch => {
	return {
		editReplyAdmin: (replyId, values, editChange) => dispatch(actionTypesDiscussion.editReplyAdmin(replyId, values, editChange)),
		editReplyUser: (replyId, values, editChange) => dispatch(actionTypesDiscussion.editReplyUser(replyId, values, editChange))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(EditReply);