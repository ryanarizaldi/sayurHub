import React from 'react';
import Skeleton from './Skeletons';
import Shimmer from './Shimmer';
import styles from './SkeletonProduct.module.css';

const SkeletonDetail = () => {
	
	return(
		<div className={styles.WrapperReview}>
			<div className={styles.SkeletonReview}>
				<div>
					<Skeleton type="avatarDetail" />
				</div>
				<div>
					<Skeleton type="text" />
					<Skeleton type="textReview" />
				</div>
			</div>
			<Shimmer />
		</div>
	)
}

export default SkeletonDetail;