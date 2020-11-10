import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionTypesCart from "../../redux/action/ActionCart";

import styles from './cart.module.css';
import Order from './order';
import CartModal from './cartModal';

function Cart (props) {
	
	const { cart, getCart, totalPrice } = props;
	
	
	useEffect(() => {
		getCart();
	}, [getCart])

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
					item={item}
					/>
			)})
			: "there's no cart added"}
			<hr></hr>
			<div className={styles.Checkout}>
				<h2>Sub Total:</h2>
				<p>Rp.{totalPrice}</p>
				<button>CHECKOUT</button>
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