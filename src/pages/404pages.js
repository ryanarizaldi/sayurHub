import React from 'react';
import logo from "../assets/img/logo.svg";
import styles from './Bg.module.css';
import NotFound from '../components/notFound/NotFound';

function NotFoundPages(){
	
	return(
		<div className={styles.Wrapper}  style={{overflow: "hidden"}}>
			<NotFound />
		</div>
	)
}

export default NotFoundPages;