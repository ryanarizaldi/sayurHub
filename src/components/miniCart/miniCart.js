import React, { useState } from "react";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styles from './miniCart.module.css';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Robert from '../../assets/img/robert.png';
import {Link} from 'react-router-dom';


function MiniCart (props) {
	
	const {open, onClose} = props;
	
	
	return(
		<>
			<SwipeableDrawer open={open} onClose={onClose} anchor="right" className={styles.Modal} transitionDuration={500}>
				<div className={styles.Container}>
					<CloseIcon className={styles.CloseIcon} fontSize="large" onClick={onClose}/>
					<h1 className={styles.Title}>Shopping Cart</h1>
					<div className={styles.Cart}>
						<div>
							<img src={Robert} alt="robert"></img>
						</div>
						<div>
							<h1>Robert bukan Robret</h1>
							<p>1 x Rp.140.000.00</p>
						</div>
						<div>
							<CloseIcon className={styles.IconDelete} fontSize="small"/>
						</div>
					</div>
					<div className={styles.Cart}>
						<div>
							<img src={Robert} alt="robert"></img>
						</div>
						<div>
							<h1>Robert bukan Robret</h1>
							<p>1 x Rp.140.000.00</p>
						</div>
						<div>
							<CloseIcon className={styles.IconDelete} fontSize="small"/>
						</div>
					</div>
					<div className={styles.Subtotal}>
						<p>Subtotal:</p>
						<p>Rp.280.000.00</p>
					</div>
					<div className={styles.Button}>
						<Link to="/cart">
							<button onClick={onClose}>View Cart</button>
						</Link>
						<Link to="#">
							<button>Checkout</button>
						</Link>
					</div>
				</div>
			</SwipeableDrawer>
		</>
	)
}

export default MiniCart;