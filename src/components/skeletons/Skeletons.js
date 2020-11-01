import React from 'react';
import './Skeletons.css';

const Skeleton = ({type}) => {
	const classes = `Skeleton ${type}`;
	
	return(
		<div className={classes}></div>
	)
}

export default Skeleton;