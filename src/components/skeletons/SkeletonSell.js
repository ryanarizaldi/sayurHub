import React from 'react';
import Skeleton from './Skeletons';
import Shimmer from './Shimmer';
import styles from './SkeletonProduct.module.css';

const SkeletonSell = () => {
	
	return(
		<div className={styles.WrapperSell}>
			<div className={styles.SkeletonSell}>
				<Skeleton type="round" />
				<Skeleton type="text" />
				<Skeleton type="text" />
				<Skeleton type="title" />
			</div>
			<Shimmer />
		</div>
	)
}

export default SkeletonSell;