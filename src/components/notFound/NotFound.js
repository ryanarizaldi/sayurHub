import React from 'react';
import styles from './NotFound.module.css';
import logo from "../../assets/img/logo.svg";
import shoping from "../../assets/img/shoping.svg";
import {Link} from 'react-router-dom';
import Cloud from "../../assets/img/Cloud.png";
import './NotFound.css';

function NotFound() {
	
	return(
		<div>	
			<div className={styles.WrapperAnimation}>
				<div className="cloud x1"></div>
				<div className="cloud x1_5"></div>
				<div className="cloud x2"></div>
				<div className="cloud x3"></div>
				<div className="cloud x4"></div>
				<div className="cloud x5"></div>
       		</div>
			<div className={styles.Logo}>
 	        	<img src={logo} alt="logo"></img>
      		</div>
      		<div className={styles.Row}>
        		<div className={styles.Image}>
          			<img src={shoping} alt="logo"></img>
        		</div>
				<div className={styles.TitleDiv}>
					<h2>404</h2>
					<h1>Far Out</h1>
					
					<p>We're not sure how you got here... But you may be lost in nothingness.</p>
					<Link to="/">
						<button>TAKE ME HOME</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFound;