import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import styles from './SellerProduct.module.css';
import Swal from 'sweetalert2';
import EditProductModal from '../editProductModal/EditProductModal';
import * as actionTypes from '../../redux/action/Action';
import axios from 'axios';

function Product (props) {
	
	const { list , setTrigger } = props;
	
	const [modal, setModal] = useState({
		editProduct: false,
		deleteProduct: false
	})
	
	const removeProduct = (item, id) => {
        Swal.fire({
            title: `Delete ${item}?`,
            text: "This action cannot be undone",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
       	 })
			.then((result) => {
        		if (result.isConfirmed) {
					removeFetch(id)
					setTrigger()
           		}
          	})
    }
	
	const removeFetch = async (id) => {
			const token = localStorage.getItem('token');
		try {
      		const deleting = await axios({
        		method: "delete",
    			url: `https://pacific-oasis-23064.herokuapp.com/products/delete/${id}`,
        		headers: {
         			 token: token,
       			},
     		});
      		Swal.fire("Deleted!", `${deleting.data.message}`, "success");
   			} catch (error) {
				console.log(error);
			}
		}
	
	const onChange = ( name, value ) => {
    	setModal({ 
			[name] : value
		})
		setTrigger();
		console.log("modal is" + modal);
	}
	
	const { editProduct, deleteProduct } = modal;
	
	let modale = "";
	
	if(editProduct){
		 modale = <EditProductModal
			productData={list}
			open={editProduct}
            onChange={onChange}
            onClose={() => onChange("editProduct", false)}
		  />
	 }
	
	return(
		<>
			<div key={list._id} className={styles.CardProduct}>
                <img src={list.product_image} alt="seller product"/>
                <p>{list.product_name}</p>
                <span>Rp.{list.price}</span>
                <div className={styles.CardButton}>
                    <button onClick={() => onChange('editProduct', true)}>Edit</button>
                    <button onClick={() => removeProduct(list.product_name, list._id)}>Delete</button>
                </div>		
          	</div>
			{modale}
		</>
	)
}

const mapDispatchToProps = dispatch => {
	return{
		setTrigger: () => dispatch(actionTypes.setTrigger())
	}
}

export default connect(null, mapDispatchToProps)(Product);