import React from 'react';
import styles from './body.module.css';
import Grapes from '../../assets/img/Grapes.png';
import ShoppingCart from '../../assets/img/shopping-cart.png';

function Product () {
	
	return(
		<div className={styles.Card}>
			<img src={Grapes} alt="grapes"></img>
			<h1>Smol Tomato</h1>
			<p>Rp. 12.000</p>
			<button>
				<img src={ShoppingCart} alt="Shopping Cart"></img>
				Add to Cart
			</button>
		</div>
	)
}

export default Product;