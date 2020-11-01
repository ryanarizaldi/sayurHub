import React from 'react';
import Skeleton from './Skeletons';
import Shimmer from './Shimmer';
import styles from './SkeletonProduct.module.css';

const SkeletonProfile = () => {
	
	return(
		<div className={styles.ProfileWrapper}>
			<div className={styles.SkeletonProfile}>
				<Skeleton type="avatar" />
				<Skeleton type="text" />
				<Skeleton type="text" />
				<Skeleton type="title" />
			</div>
			<Shimmer />
		</div>
	)
}

export default SkeletonProfile;