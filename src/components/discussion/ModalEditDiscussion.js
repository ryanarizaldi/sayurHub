import React, {useState} from 'react';
import {connect} from 'react-redux';

import { Modal } from "@material-ui/core";
import styles from './modalAddDiscussion.module.css';
import { useFormik } from "formik";
import * as actionTypesDiscussion from '../../redux/action/ActionDiscussion';
import * as Yup from "yup";
import CloseIcon from '@material-ui/icons/Close';



const schemaEdit = Yup.object().shape({
		 write: Yup.string()
			.min(5, "Text must be 5 characters at minimum")
			.required("Text is required"),
	});


function ModalEditDiscussion(props) {

    const {open, onClose, list, editDiscussion, loading} = props;

	const formik = useFormik({
		initialValues: {
			write: list.write
		},
		onSubmit: values => {
          editDiscussion(list._id, values)
        },
		validationSchema: schemaEdit
	})
	
    return (
        <Modal open={open} onClose={onClose} className={styles.Modal}>
            <div className={styles.EditUser}>
            	<CloseIcon className={styles.CloseIcon} fontSize="large" onClick={onClose}/>
                <form className={styles.Form} onSubmit={formik.handleSubmit}>
                    <label htmlFor="write">Text goes here</label>
                    <input 
						type="text" 
						name="write"
						id="write"
						value={formik.values.write}
						onBlur={formik.handleBlur} 
						onChange={formik.handleChange}
						className={
								formik.touched.write && formik.errors.write
								  ? styles.ErrorInput
								  : null }>
					</input>
						{formik.touched.write && formik.errors.write ? (
							  <div className={styles.ErrorMsg}>{formik.errors.write}</div>
							) : null}
                    <div className={styles.ButtonGroup}>
						{!loading ?  <button className={styles.Submit} type="submit">Save Changes</button>
							:  <button className={styles.Submit} type="submit">...Please wait</button>	}    
                    </div>
                </form>
            </div>
		</Modal>
    )
}


const mapStateToProps = state => {
	return {
		loading: state.discussion.loadingAdd
	}
}

const mapDispatchToProps = dispatch => {
	return{
		editDiscussion: (discussionId, values) => dispatch(actionTypesDiscussion.editDiscussion(discussionId, values))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditDiscussion);