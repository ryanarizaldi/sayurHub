import React from 'react';
import styles from './CreateProductModal.module.css';
import { Modal } from "@material-ui/core";
import { useFormik } from "formik";

function CreateProductModal (props) {
	
	const { open, onClose } = props;
	
	return(
		<div>
			<Modal open={open} onClose={onClose}>
				<div className={styles.ContainerModal}>
					<h1>Create Product</h1>
					<h2 onClick={onClose}>X</h2>
					<form>
						<label className={styles.UploadImage}>
    						<input type="file"/>
    						UPLOAD IMAGE
						</label>
						<label htmlFor="productName">Product Name</label>
						<input 
							type="text" 
							id="productName"
							name="productName" 
							placeholder=""></input>
						<label htmlFor="description">Description</label>
						<input 
							type="text" 
							id="description"
							name="description" 
							placeholder=""></input>
						<label htmlFor="category">Category</label>
						<select name="category">
							<option value=""></option>
							<option value="fruits">Fruits</option>
							<option value="vegetables">Vegetables</option>
							<option value="diet">Diet</option>
						</select>
						<label htmlFor="price">Price</label>
						<input 
							type="number"
							name="price"
							id="price"
							></input>
						<label htmlFor="stock">Stock</label>
						<input 
							type="number"
							name="stock"
							id="stock"></input>
						<button type="submit">CREATE PRODUCT</button>
					</form>
				</div>
			</Modal>
		</div>
	)
}

export default CreateProductModal;