import React from 'react';
import styles from './CreateProductModal.module.css';
import { Modal } from "@material-ui/core";
import { useFormik } from "formik";

function CreateProductModal (props) {
	
	const { open, onClose } = props;
	
	return(
		<div>
			<Modal open={open} onClose={onClose} className={styles.Modal}>
				<div className={styles.ContainerModal}>
					<h1>Create Product</h1>
					<h2 onClick={onClose}></h2>
					<form className={styles.Form}>
						<label className={styles.UploadImage}>
    						<input type="file"/>
    						UPLOAD IMAGE
						</label>
						<label className={styles.Label} htmlFor="productName">Product Name</label>
						<input 
							type="text" 
							id="productName"
							name="productName" 
							placeholder=""></input>
						<label htmlFor="description" className={styles.Label}>Description</label>
						<input 
							type="text" 
							id="description"
							name="description" 
							placeholder=""></input>
						<label className={styles.Label} htmlFor="category">Category</label>
						<select name="category">
							<option value=""></option>
							<option value="fruits">Fruits</option>
							<option value="vegetables">Vegetables</option>
							<option value="diet">Diet</option>
						</select>
						<label htmlFor="price" className={styles.Label}>Price</label>
						<input 
							type="number"
							name="price"
							id="price"
							></input>
						<label htmlFor="stock" className={styles.Label}>Stock</label>
						<input 
							type="text"
							name="stock"
							id="stock"></input>
						<button type="submit">CREATE</button>
					</form>
				</div>
			</Modal>
		</div>
	)
}

export default CreateProductModal;