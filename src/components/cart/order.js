import React from 'react';
import styles from './order.module.css';
import cartImage from '../../assets/img/cart.png';

function order () {
	
	return (
		<div className={styles.Container}>
			<img src={cartImage} alt="cart"></img>
			<h1>Smol Tomato</h1>
			<p>Rp.12.000,-</p>
			<div className={styles.Button}>
				<button>-</button>
				<button>1</button>
				<button>+</button>
			</div>
			<h3>Rp.12.000,-</h3>
			<button className={styles.Delete}>DELETE</button>
		</div>
	)
}

export default order;