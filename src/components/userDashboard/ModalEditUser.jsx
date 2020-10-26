import React, {useState} from 'react';
import {connect} from 'react-redux';

import { Modal } from "@material-ui/core";
import styles from './ModalEditUser.module.css';
import robert from '../../assets/img/robert.png';
import { useFormik } from "formik";
import {Redirect} from 'react-router-dom';
import * as actionTypes from '../../redux/action/Action';
import * as Yup from "yup";



const schemaEdit = Yup.object().shape({
	 	 email: Yup.string()
			.email("Invalid email address format")
			.required("Email is required"),
	 	 full_name: Yup.string()
			.min(5, "Password must be 5 characters at minimum")
			.required("Fullname is required"),
		 description: Yup.string()
			.min(5, "Password must be 5 characters at minimum")
			.required("Description is required"),
	});


function ModalEditUser(props) {

    const {open, onClose, userData, editUser, isSuccess} = props;
	
	const [profile_image, setProfile_image] = useState({
				file: {},
				url: ""
	})
	
	const changePic = (e) => {
		const file = e.currentTarget.files[0];
		setProfile_image({
				file: e.currentTarget.files[0],
				url: URL.createObjectURL(file),
		})
	}
	
	const formik = useFormik({
		initialValues: {
			full_name: userData.full_name,
			email: userData.email,
			description: userData.description,
		},
		onSubmit: values => {
          editUser(values, userData._id, profile_image.file, onClose)
        },
		validationSchema: schemaEdit
	})
	
    return (
        <Modal open={open} onClose={onClose}>
            <div className={styles.EditUser}>
                <div className={styles.Header}>
                    <h1>Edit User</h1>
                    <button onClick={onClose}>X</button>
                </div>
                <form className={styles.Form} onSubmit={formik.handleSubmit}>
                    <img src={userData.profile_image} alt={userData.full_name}/>
                    <label for="profile_image" className={styles.CustomUpload}>
                        Upload Image
                    </label>
                    <input 
						type="file" 
						size="60" 
						name="profile_image" 
						id="profile_image"
						onChange={(e) => changePic(e)}></input>
                    <label for="full_name">Full Name</label>
                    <input 
						type="text"
						value={formik.values.full_name}
						id="full_name"
						name="full_name" 
						onBlur={formik.handleBlur} 
						onChange={formik.handleChange}
						></input>
                    <label for="email">Email</label>
                    <input 
						id="email"
						name="email" 
						value={formik.values.email}
						type="email" 
						onBlur={formik.handleBlur} 
						onChange={formik.handleChange} ></input>
                    <label for="description">Description</label>
                    <input 
						type="text" 
						name="description"
						id="description"
						value={formik.values.description}
						onBlur={formik.handleBlur} 
						onChange={formik.handleChange}></input>
                    <div className={styles.ButtonGroup}>
                        <button className={styles.Cancel}>Cancel</button>
                        <button className={styles.Submit} type="submit">Save Changes</button>
                    </div>
                </form>
            </div>
		</Modal>
    )
}

const mapStateToProps = state => {
	return{
		isSuccess: state.isSuccess
	}
}

const mapDispatchToProps = dispatch => {
	return{
		editUser: (values, id, state, onClose) => dispatch(actionTypes.editUser(values, id, state, onClose))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);