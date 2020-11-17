import React from 'react';
import {connect} from 'react-redux';

import { Modal } from "@material-ui/core";
import styles from './modalAddDiscussion.module.css';
import { useFormik } from "formik";
import * as actionTypesDiscussion from '../../redux/action/ActionDiscussion';
import * as Yup from "yup";
import CloseIcon from '@material-ui/icons/Close';
import { useParams } from "react-router-dom";



const schemaEdit = Yup.object().shape({
		 write: Yup.string()
			.min(5, "Text must be 5 characters at minimum")
			.required("Text is required"),
	});


function ModalAddDiscussion(props) {

    const {open, onClose, addDiscussion, loading} = props;

	const { id } = useParams();

	const formik = useFormik({
		initialValues: {
			write: ""
		},
		onSubmit: values => {
          addDiscussion(id, values, onClose)
        },
		validationSchema: schemaEdit
	})
	
    return (
        <Modal open={open} onClose={onClose} className={styles.Modal}>
            <div className={styles.EditUser}>
            	<CloseIcon className={styles.CloseIcon} fontSize="large" onClick={onClose}/>
                <form className={styles.Form} onSubmit={formik.handleSubmit}>
                    <label htmlFor="write">Question</label>
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
						{!loading ?  <button className={styles.Submit} type="submit">Add Question</button>
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
		addDiscussion: (productId, values, onClose) => dispatch(actionTypesDiscussion.addDiscussion(productId, values, onClose))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddDiscussion);