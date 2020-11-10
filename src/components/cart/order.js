import React, {useState, useEffect} from 'react';

import styles from './order.module.css';
import cartImage from '../../assets/img/cart.png';

function Order (props) {
	
	const { item } = props;
	
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
	}, [quantity])
	
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
			<button className={styles.Delete}>DELETE</button>
		</div>
	)
}

export default Order;