import React from 'react';
import Skeleton from './Skeletons';
import Shimmer from './Shimmer';
import styles from './SkeletonHistory.module.css';

const SkeletonProduct = () => {
	
	return(
		<div className={styles.WrapperHistory}>
			<div className={styles.SkeletonHistory}>
				<div>
					<Skeleton type="avatarDetail" />
				</div>
				<div>
					<Skeleton type="text" />
					<Skeleton type="text" />
				</div>
				<div>
					<Skeleton type="text" />
				</div>
				
			</div>
			<Shimmer />
		</div>
	)
}

export default SkeletonProduct;