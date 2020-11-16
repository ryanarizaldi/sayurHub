import React, {useState, useEffect} from 'react';

import styles from './order.module.css';
import axios from 'axios';
import Swal from "sweetalert2";

function Order (props) {
	
	const { item, cart, getCart } = props;
	
	const total = item.price * item.quantity;
	
	const [quantity, setQuantity] = useState(item.quantity),
		  [totalPrice, setTotalPrice] = useState(total);
	
	const addQuantity = () => {
		if(quantity >= 1 && quantity !== 0){
			setQuantity(quantity + 1);
		}
	}
	
	const reduceQuantity = () => {
		if(quantity !== 1 && quantity !== 0){
			setQuantity(quantity - 1);
		}
	}
	
	useEffect(() => {
		setTotalPrice(item.price * quantity);
	}, [quantity, item.price])
	
	const actualRemove = async (cartId, productId) => {
    try {
    	const remove = await axios({
        	method: "delete",
        	url: `https://pacific-oasis-23064.herokuapp.com/cart/delete/${cartId}/${productId}`,
        	headers: {
            	token: localStorage.getItem("token"),
       	 	}
      	 })
      	 	console.log("remove response", remove);
    	} catch (error) {
			console.log(error);
		}
 	}

	
	const removeProduct = (cartId, productId) => {
    	Swal.fire({
      		title: `Delete this cart?`,
			text: "This action cannot be undone",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				actualRemove(cartId, productId);
				getCart();
				Swal.fire("Deleted!", `this product has been deleted.`, "success");
			}
		})
	}
	
	return (
		<div className={styles.Container}>
			<img src={item.image} alt={item.name}></img>
			<h1>{item.name}</h1>
			<p>Rp.{item.price},-</p>
			<div className={styles.Button}>
				<button onClick={() => reduceQuantity()}>-</button>
				<button>{quantity}</button>
				<button onClick={() => addQuantity()}>+</button>
			</div>
			<h3>Rp.{totalPrice},-</h3>
			<button onClick={() => removeProduct(cart._id, item.id)} className={styles.Delete}>DELETE</button>
		</div>
	)
}

export default Order;