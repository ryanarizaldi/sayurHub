import React, {useState} from 'react';
import {connect} from 'react-redux';
import * as actionTypesDiscussion from "../../redux/action/ActionDiscussion";

import styles from './ListReply.module.css';
import AddReply from './AddReply';
import EditReply from './EditReply';
import AdminIco from "../../assets/img/admin.jpg";
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';
import Swal from "sweetalert2";
import axios from 'axios';

function ListReply (props) {
	
	const { discussionId, reply, replyLength, index, user, deleteReplyAdmin, deleteReplyUser } = props;
	
	const [token] = useState(localStorage.getItem('token')),
		  [tokenAdmin] = useState(localStorage.getItem('tokenAdmin')),
		  [edit, setEdit] = useState(false);
	
	const removeReplyAdmin = () => {
    	Swal.fire({
      		title: `Delete this Reply?`,
			text: "This action cannot be undone",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteReplyAdmin(reply._id);
				Swal.fire("Deleted!", `this reply has been deleted.`, "success");
			}
		})
	}
	
	const removeReplyUser = () => {
    	Swal.fire({
      		title: `Delete this Reply?`,
			text: "This action cannot be undone",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteReplyUser(reply._id);
				Swal.fire("Deleted!", `this reply has been deleted.`, "success");
			}
		})
	}
	
	const editChange = () => {
		setEdit(!edit);
	}
	
	const lastIndex = replyLength.length - 1;
	
	return (
		
		<div className={styles.Border}>
			{reply ?
			<div className={styles.Wrapper}> 
				<div>
					<img src={reply.admin !== null ? AdminIco : reply.user.profile_image } alt="azanirr"></img>
				</div>	
				<div className={styles.Reply}>
					<h1>{reply.admin !== null ? "Sayurhub" : reply.user.full_name} • { reply.admin !== null  
					  ? <span className={styles.Admin}>Admin</span> : "" }
						<span>{moment(reply.createdAt).format("DD MMMM YYYY • HH:mm")}</span>
						<span>{reply?.user?._id === user._id && token ? " | " : ""}{tokenAdmin ? " | " : ""}<a 
								className={styles.LinkEdit} 
								onClick={() => editChange()}
								>{reply?.user?._id === user._id && token ? "edit" : "" }{tokenAdmin ? "edit" : "" }</a></span>
					</h1>
					{!edit ? 	
					 <p>{reply.reply}</p>
					: <EditReply
						  reply={reply}
						  editChange={editChange}
						  discussionId={discussionId}
						  edit={edit}
						  />}
				</div>
				{tokenAdmin && !edit ? 
						<CloseIcon 
							onClick={() => removeReplyAdmin()}
							className={styles.Icon} /> : "" }
				{reply.admin === null && user._id === reply.user._id && !edit ? 
						<CloseIcon 
							onClick={() => removeReplyUser()}
							className={styles.Icon} /> : "" }
			</div>
			: "" }
			{lastIndex === index ?
			<AddReply 
				reply={reply}
				discussionId={discussionId}/>
			: ""}
		</div>
	)
}


const mapDispatchToProps = dispatch => {
	return {
		deleteReplyAdmin: (replyId) => dispatch(actionTypesDiscussion.deleteReplyAdmin(replyId)),
		deleteReplyUser: (replyId) => dispatch(actionTypesDiscussion.deleteReplyUser(replyId))
	}
}

export default connect(null, mapDispatchToProps)(ListReply);