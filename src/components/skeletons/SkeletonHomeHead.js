import React from 'react';
import Skeleton from './Skeletons';
import Shimmer from './Shimmer';
import styles from './SkeletonHomeHead.module.css';

const SkeletonHomeHead = () => {
	
	return(
		<div className={styles.Head}>
		<div className={styles.WrapperHomeHead}>
			<div className={styles.SkeletonHomeHead}>
			</div>
			<Shimmer />
		</div>
		<div className={styles.WrapperHomeHead}>
			<div className={styles.SkeletonHomeHead}>
			</div>
			<Shimmer />
		</div>
		</div>
	)
}

export default SkeletonHomeHead;