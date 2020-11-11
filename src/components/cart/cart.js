import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actionTypesCart from "../../redux/action/ActionCart";

import styles from './cart.module.css';
import Order from './order';
import CartModal from './cartModal';
import axios from 'axios';
import Swal from "sweetalert2";

function Cart (props) {
	
	const [trigger, setTrigger] = useState(false);
	
	const { cart, getCart, totalPrice } = props;
	
	const actualRemove = async (cartId) => {
    try {
    	const remove = await axios({
        	method: "delete",
        	url: `https://pacific-oasis-23064.herokuapp.com/cart/empty/${cartId}`,
        	headers: {
            	token: localStorage.getItem("token"),
       	 	}
      	 })
      	 	console.log("remove response", remove);
    	} catch (error) {
			console.log(error);
		}
 	}

	
	const emptyCart = (cartId) => {
    	Swal.fire({
      		title: `Delete all items in cart?`,
			text: "This action cannot be undone",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				actualRemove(cartId);
				setTrigger(true);
				Swal.fire("Deleted!", `this product has been deleted.`, "success");
			}
		})
	}
	
	
	useEffect(() => {
		getCart();
	}, [getCart, trigger])

	return(
		<div className={styles.Container}>
			<div className={styles.Title}>
				<p>Product</p>
				<p>Price</p>
				<p>Quantity</p>
				<p>Total Price</p>
				<p>Action</p>
			</div>
			{cart.items?.length > 0 ?
				cart.items.map((item, i) => {
			return (
				<Order
					i={i}
					key={i}
					trigger={trigger}
					cart={cart}
					getCart={getCart}
					item={item}
					/>
			)})
			: "there's no cart added"}
			
			
			<hr></hr>
			<div className={styles.Checkout}>
				<h2>Sub Total:</h2>
				<p>Rp.{totalPrice}</p>
				<button>CHECKOUT</button>
				<button onClick={() => emptyCart(cart._id)} className={styles.Empty}>EMPTY CART</button>
			</div>
		</div>		
	)
}



const mapStateToProps = state => {
	return {
		cart: state.cart.cart,
		totalPrice: state.cart.totalPrice
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getCart: () => dispatch(actionTypesCart.getCart())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);