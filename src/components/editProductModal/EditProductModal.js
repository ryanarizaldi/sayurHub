import React, { useState } from 'react';
import {connect} from 'react-redux';

import styles from './EditProductModal.module.css';
import { Modal } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as actionTypes from "../../redux/action/Action";

const schemaEdit = Yup.object().shape({
    product_name: Yup.string().required("Product Name is required"),
    description: Yup.string().required("Description is required"),
    discount: Yup.number()
      .integer("Description must be a round number")
      //   .max(1, "kebanyakan")
      //   .moreThan(0, "must be bigger than 0!")
      .lessThan(100, "You must be drunkif its true!"),
    //   .required("Description is required"),
    category: Yup.string().required("Choose one!"),
    price: Yup.number()
      .integer("Price must be a round number!")
      .required("Type the price!")
      .moreThan(99, "Must be bigger than 100!"),
    stock: Yup.number()
      .integer("Stock must be a round number!")
      .required("Type the stock!")
      .moreThan(4, "Minimum stock is 5"),
    weight: Yup.number()
      .moreThan(0, "minimum weight is 1")
      .integer("Weight must be a round number!")
      .required("Type the weighy!"),
  });


function EditProductModal (props) {
	
	const { open, onClose, productData, editProduct, trigger } = props;
	
	const [product_image, setProduct_image] = useState({
				file: {},
				url: productData.product_image
	})
	
	const changePic = (e) => {
		const file = e.currentTarget.files[0];
		setProduct_image({
				file: e.currentTarget.files[0],
				url: URL.createObjectURL(file),
		})
	}
	
	const formik = useFormik({
		initialValues: {
			product_name: productData.product_name,
     		description: productData.description,
      		category: productData.category,
		    discount: productData.discount,
		    price: productData.price,
		    stock: productData.stock,
		    weight: productData.weight,
			},
		onSubmit: values => {
          editProduct(values, productData._id, product_image.file, onClose)
        },
		validationSchema: schemaEdit
	})
	
	
	return(
			<Modal open={open} onClose={onClose} className={styles.Modal}>
				<div className={styles.ContainerModal}>
					<h1>Edit Product</h1>
					<h2 onClick={onClose}>x</h2>
					<form className={styles.Form} onSubmit={formik.handleSubmit}>
						<div className={styles.Container}>
							<img src={product_image.url} alt="grapes"></img>
							<label className={styles.UploadImage} htmlFor="product_image">
								<input 
									type="file" 
									name="product_image"
									id="product_image"
									onChange={(e) => changePic(e)}/>
								UPLOAD IMAGE
							</label>
						</div>
						<label className={styles.Label} htmlFor="product_name">Product Name</label>
							<input
							  onChange={formik.handleChange}
							  onBlur={formik.handleBlur}
							  type="text"
							  id="product_name"
							  name="product_name"
							  value={formik.values.product_name}
							  className={
								formik.touched.product_name && formik.errors.product_name
								  ? styles.ErrorInput
								  : null } ></input>
							{formik.touched.product_name && formik.errors.product_name ? (
							  <div className={styles.ErrorMsg}>{formik.errors.product_name}</div>
							) : null}
						<label className={styles.Label} htmlFor="description">Description</label>
							  <input
								  onChange={formik.handleChange}
								  onBlur={formik.handleBlur}
								  type="text"
								  id="description"
								  name="description"
								  value={formik.values.description}
								  className={
									formik.touched.description && formik.errors.description
									  ? styles.ErrorInput
									  : null} ></input>
								{formik.touched.description && formik.errors.description ? (
								  <div className={styles.ErrorMsg}>{formik.errors.description}</div>
								) : null}
						
						<label className={styles.Label} htmlFor="category">Category</label>
						<select 
							id="category"
							onChange={formik.handleChange}
    						onBlur={formik.handleBlur}
							name="category" 
							value={formik.values.category}
							className={
									formik.touched.category && formik.errors.category
									  ? styles.ErrorInput
									  : null
								  }>
							<option disabled></option>
							<option value="Fruit">Fruits</option>
							<option value="Vegetables">Vegetables</option>
							<option value="Diet">Diet</option>
						</select>
							{formik.touched.category && formik.errors.category ? (
								  <div className={styles.ErrorMsg}>{formik.errors.category}</div>
								) : null}
						
						<label htmlFor="discount" className={styles.Label}>Discount</label>
						<input 
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							type="number"
							name="discount"
							id="discount"
							value={formik.values.discount}
							className={
									formik.touched.discount && formik.errors.discount
									  ? styles.ErrorInput
									  : null
								  }
							></input>
							{formik.touched.discount && formik.errors.discount ? (
								  <div className={styles.ErrorMsg}>{formik.errors.discount}</div>
								) : null}
						
						<label htmlFor="price" className={styles.Label}>Price</label>
						<input 
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							type="number"
							name="price"
							id="price"
							value={formik.values.price}
							className={
									formik.touched.price && formik.errors.price
									  ? styles.ErrorInput
									  : null
								  }
							></input>
							{formik.touched.price && formik.errors.price ? (
								  <div className={styles.ErrorMsg}>{formik.errors.price}</div>
								) : null}
						
						<label htmlFor="stock" className={styles.Label}>Stock</label>
						<input 
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							type="number"
							name="stock"
							id="stock"
							value={formik.values.stock}
							className={
									formik.touched.stock && formik.errors.stock
									  ? styles.ErrorInput
									  : null
								  }></input>
							{formik.touched.stock && formik.errors.stock ? (
								  <div className={styles.ErrorMsg}>{formik.errors.stock}</div>
								) : null}
						
						<label htmlFor="weight" className={styles.Label}>Weight</label>
						<input 
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							type="number"
							name="weight"
							id="weight"
							value={formik.values.weight}
							className={
									formik.touched.weight && formik.errors.weight
									  ? styles.ErrorInput
									  : null
								  }></input>
							{formik.touched.weight && formik.errors.weight ? (
								  <div className={styles.ErrorMsg}>{formik.errors.weight}</div>
								) : null}
						
						<button type="submit">Edit</button>
					</form>
				</div>
			</Modal>
	)
}

const mapDispatchToProps = dispatch => {
	return{
		editProduct: (values, id, state, onClose) => dispatch(actionTypes.editProduct(values, id, state, onClose))
	}
}


export default connect(null, mapDispatchToProps)(EditProductModal);