import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import * as actionTypesDiscussion from "../../redux/action/ActionDiscussion";

import ListReply from './ListReply';
import styles from './ListDiscussion.module.css';
import ModalEditDiscussion from './ModalEditDiscussion';
import ReplyPagination from './ReplyPagination';
import AddReply from './AddReply';
import Swal from "sweetalert2";
import axios from 'axios';
import moment from 'moment';

function ListDiscussion (props) {
	
	const { list, deleteDiscussion, user, trigger} = props;

	const [modal, setModal] = useState({editDiscussion:false}),
		  [tokenAdmin] = useState(localStorage.getItem('tokenAdmin')),
		  [reply, setReply] = useState([]),
		  [endPage, setEndPage] = useState(4),
		  [allReply, setAllReply] = useState([]),
		  [loading, setLoading] = useState(false);
	
		
	const triggerPageHandler = () => {
			setLoading(true);
			setEndPage(endPage + 4);
		}
	
	useEffect(() => {
		
		axios.get("https://pacific-oasis-23064.herokuapp.com/reply/" + list._id)
			.then(response => {
			let data = response.data.data.reverse();
			setAllReply(response.data.data);
			if(data.length > 4){
			   let sliced = data.slice(0, endPage);
			   let reversed = sliced.reverse()
			   setReply(reversed);
			   setLoading(false);
			} else {
				setReply(data);
			}
		})
			.catch(error => {
			console.log(error)
		})
		
	}, [trigger, list._id, endPage])
	
	const onChange = ( name, value ) => {
    	setModal({ 
			[name] : value
		})
  	}
	
	const {editDiscussion} = modal;
	
	const removeDiscussion = () => {
    	Swal.fire({
      		title: `Delete this discussion?`,
			text: "This action cannot be undone",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteDiscussion(list._id);
				Swal.fire("Deleted!", `this discussion has been deleted.`, "success");
			}
		})
	}
	
	return (
		<>
			<div className={styles.Discussion}>
				<div>
					<img src={list.user.profile_image} alt={list.user.full_name}></img>
				</div>
				<div>
					<h1>{list.user.full_name} • <span>{moment(list.createdAt).format("DD MMMM YYYY • HH:mm")}</span></h1>
					<p>{list.write}</p>
				</div>
				{user._id === list.user._id || tokenAdmin ? 
				<div>
					<button onClick={() => onChange('editDiscussion', true)} className={styles.Edit}>EDIT</button>
					<button onClick={() => removeDiscussion()} className={styles.Delete}>DELETE</button>
				</div>
				: ""  }		
			</div>
			{allReply?.length > 4 && allReply?.length !== reply?.length ?
				<ReplyPagination 
					loading={loading}
					triggerPageHandler={triggerPageHandler}/>
			: "" }
			{reply?.length > 0 ?
				reply.map((replied, i) => {
				return (
				<ListReply 
					key={i}
					reply={replied}
					discussionId={list._id}
					replyLength={reply}
					index={i}
					user={user}
					/>
				)
			})
			: <AddReply discussionId={list._id}/> }
			<ModalEditDiscussion 
				open={editDiscussion}
				onClose={() => onChange('editDiscussion', false)}
				list={list}/>
		</>
	)
}

const mapStateToProps = state => {
	return {
		user: state.index.userData,
		trigger: state.discussion.trigger
	}
}

const mapDispatchToProps = dispatch => {
	return {
		deleteDiscussion: (discussionId) => dispatch(actionTypesDiscussion.deleteDiscussion(discussionId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDiscussion);