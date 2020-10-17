import React from 'react';
import { Modal } from "@material-ui/core";
import styles from './cartModal.module.css';

function cartModal (props) {
	
	const { open, onClose } = props;
	
	return(
		<div>
			<Modal open={open} onClose={onClose}>
				<div className={styles.ContainerModal}>
					<h1 onClick={onClose}>x</h1>
					<h2>Your order is being processed</h2>
					<p>Awaiting seller's confirmation</p>
					<button onClick={onClose}>OK</button>
				</div>
			</Modal>
		</div>
	)
}

export default cartModal;