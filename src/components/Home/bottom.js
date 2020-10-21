import React from 'react';
import styles from './bottom.module.css';
import Fruit from '../../assets/img/Fruit.png';

function Bottom () {
	
	return(
		<div className={styles.Container}>
			<div className={styles.Background}>
				<h1>Want to sell your products?</h1>
				<button>SIGN UP NOW</button>
				<img src={Fruit} alt="fruit"></img>
			</div>
		</div>
	)
}

export default Bottom;