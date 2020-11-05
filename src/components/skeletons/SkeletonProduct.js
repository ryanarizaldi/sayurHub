import React from 'react';
import Skeleton from './Skeletons';
import Shimmer from './Shimmer';
import styles from './SkeletonProduct.module.css';

const SkeletonProduct = () => {
	
	return(
		<div className={styles.Wrapper}>
			<div className={styles.SkeletonProduct}>
				<Skeleton type="imagePro" />
				<Skeleton type="text" />
				<Skeleton type="text" />
				<Skeleton type="title" />
			</div>
			<Shimmer />
		</div>
	)
}

export default SkeletonProduct;