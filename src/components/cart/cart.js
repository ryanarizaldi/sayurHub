import React, {useState} from 'react';
import styles from './cart.module.css';
import Order from './order';
import CartModal from './cartModal';

function Cart () {
	
	const [modal, setModal] = useState(false);
	
	const onChange = (value) => {
		setModal(value);
		console.log(modal)
	}
	
	let modale = "";
	
	if(modal){
		modale = <CartModal
					 open={modal}
           			 onChange={onChange}
            		 onClose={() => onChange(false)} />
	}
	
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
				<button onClick={() => onChange(true)}>CHECKOUT</button>
			</div>
			{modale}
		</div>		
	)
}

export default Cart;