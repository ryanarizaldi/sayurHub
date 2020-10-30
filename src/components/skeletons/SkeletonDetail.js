import React from 'react';
import Skeleton from './Skeletons';
import Shimmer from './Shimmer';
import styles from './SkeletonProduct.module.css';

const SkeletonDetail = () => {
	
	return(
		<div className={styles.WrapperDetail}>
			<div className={styles.SkeletonDetail}>
				<div className={styles.Images}>
					<Skeleton type="bigRound"/>
				</div>
				<div className={styles.Column}>
					<Skeleton type="title" />
					<Skeleton type="title" />
					<Skeleton type="bigText" />
					<div className={styles.Avatar}>
						<div>
							<Skeleton type="avatarDetail" />
						</div>
						<div>
							<Skeleton type="text" />
							<Skeleton type="text" />
						</div>	
					</div>
					<Skeleton type="full" />
				</div>
			</div>
			<Shimmer />
		</div>
	)
}

export default SkeletonDetail;