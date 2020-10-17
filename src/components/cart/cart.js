import React from 'react';
import styles from './cart.module.css';
import Order from './order';

function cart () {
	
	return(
		<div className={styles.Container}>
			<div className={styles.Title}>
				<p>Product</p>
				<p>Price</p>
				<p>Quantity</p>
				<p>Total Price</p>
				<p>Action</p>
			</div>
			<Order />
			<Order />
			<Order />
			<hr></hr>
			<div className={styles.Checkout}>
				<h2>Sub Total:</h2>
				<p>Rp.12.000,-</p>
				<button>CHECKOUT</button>
			</div>
		</div>		
	)
}

export default cart;