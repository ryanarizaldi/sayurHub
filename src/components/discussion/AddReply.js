import React, {useState} from 'react';
import styles from './AddReply.module.css';
import { connect } from 'react-redux';

import { useFormik } from "formik";
import * as actionTypesDiscussion from '../../redux/action/ActionDiscussion';
import * as Yup from "yup";
import AdminIco from "../../assets/img/admin.jpg";

const schemaEdit = Yup.object().shape({
		 reply: Yup.string()
			.min(5, "Reply must be 5 characters at minimum")
	});



function AddReply (props) {
	
	const { addReplyAdmin, addReplyUser, discussionId, reply, user } = props;
	
	const [submit, setSubmit] = useState(false),
		  [token] = useState(localStorage.getItem('token')),
		  [tokenAdmin] = useState(localStorage.getItem('tokenAdmin'));
	
	const onChange = () => {
		setSubmit(true);
		console.log(submit);
	}
	
	const cancelSubmit = () => {
		setSubmit(false);
	}
	
	const formik = useFormik({
		initialValues: {
			reply: ""
		},
		onSubmit: values => {
          if(tokenAdmin){
			  addReplyAdmin(discussionId, values)
		  } else if (token){
			  addReplyUser(discussionId, values)
		  }
        },
		validationSchema: schemaEdit
	})
	
	
	return (
		<>
		{token || tokenAdmin ? 
		<div className={!reply ? styles.Border : styles.Noborder}>	
			<div className={styles.FormReply}>
				<div>
					<img src={tokenAdmin ? AdminIco : user.profile_image} alt="dwdw"></img>
				</div>
				<div>
					<form onSubmit={formik.handleSubmit}>
						<input
							onFocus={() => onChange()}
							className={
								formik.touched.reply && formik.errors.reply
								  ? styles.ErrorInput
								  : null }
							value={formik.values.reply}
							onBlur={formik.handleBlur} 
							onChange={formik.handleChange}
							name="reply"
							id="reply"
							placeholder="Write your reply here"
							type="text"></input>
							{formik.touched.reply && formik.errors.reply ? (
							  <div className={styles.ErrorMsg}>{formik.errors.reply}</div>
							) : null}
						{submit ? 
						<div className={styles.Submit}>
							<button onClick={() => cancelSubmit()}>CANCEL</button>
							<button type="submit">SEND</button>
						</div>
						: "" }
					</form>
				</div>
			</div>
		</div>
		 : "" }
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
		addReplyAdmin: (discussionId, values) => dispatch(actionTypesDiscussion.addReplyAdmin(discussionId, values)),
		addReplyUser: (discussionId, values) => dispatch(actionTypesDiscussion.addReplyUser(discussionId, values))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(AddReply);