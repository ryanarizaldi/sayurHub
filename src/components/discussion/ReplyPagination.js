import React from 'react';
import styles from './ReplyPagination.module.css';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';

function ReplyPagination (props) {
	
	const { loading, triggerPageHandler } = props;
	
	const triggerHandler = () => {
		triggerPageHandler();
	}

	
	return(
		<div className={styles.Wrapper} onClick={() => triggerHandler()}>
			<div className={styles.Text}>
				{!loading ? <p><ChatOutlinedIcon style={{marginRight: "10px"}}/> Show more comments</p>
					: <p>...<ChatOutlinedIcon style={{marginRight: "10px"}}/> Please Wait</p> }
			</div>
		</div>
	)
}

export default ReplyPagination;