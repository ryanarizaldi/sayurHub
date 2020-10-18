import React from 'react';
import styles from './EditProductModal.module.css';
import { Modal } from "@material-ui/core";
import { useFormik } from "formik";
import cartImage from '../../assets/img/cart.png';

function EditProductModal (props) {
	
	const { open, onClose } = props;
	
	return(
		<div>
			<Modal open={open} onClose={onClose} className={styles.Modal}>
				<div className={styles.ContainerModal}>
					<h1>Edit Product</h1>
					<h2 onClick={onClose}>x</h2>
					<form className={styles.Form}>
						<div className={styles.Container}>
							<img src={cartImage} alt="grapes"></img>
							<label className={styles.UploadImage}>
								<input type="file"/>
								UPLOAD IMAGE
							</label>
						</div>
						<label className={styles.Label} htmlFor="productName">Product Name</label>
						<input 
							type="text" 
							id="productName"
							name="productName" 
							placeholder=""
							value="apa hayo cuk"></input>
						<label htmlFor="description" className={styles.Label}>Description</label>
						<input 
							type="text" 
							id="description"
							name="description"
							value="apa hayooo jangan kepo"
							placeholder=""></input>
						<label className={styles.Label} htmlFor="category">Category</label>
						<select name="category" value="fruits">
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
							value="10000"
							></input>
						<label htmlFor="stock" className={styles.Label}>Stock</label>
						<input 
							type="text"
							name="stock"
							id="stock"
							value="15"></input>
						<button type="submit">Edit</button>
					</form>
				</div>
			</Modal>
		</div>
	)
}

export default EditProductModal;