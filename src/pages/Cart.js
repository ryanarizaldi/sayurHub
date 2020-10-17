import React from 'react';
import CartList from '../components/cart/cart';
import styles from '../components/cart/cart.module.css';

function Cart () {
	
	return(
		<div className={styles.Body}>
			<CartList />
		</div>
	)
}

export default Cart;