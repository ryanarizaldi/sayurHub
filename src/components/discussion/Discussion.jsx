import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import * as actionTypesDiscussion from "../../redux/action/ActionDiscussion";

import styles from "./Discussion.module.css";
import { useParams } from "react-router-dom";
import AddDicussion from './modalAddDiscussion';
import ForumIcon from '@material-ui/icons/Forum';
import ListDiscussion from './ListDiscussion';
import { Redirect } from "react-router-dom";

function Discussion(props) {
	
	const {getDiscussion, discussion, trigger} = props;
	
	const { id } = useParams();
	
	useEffect(() => {
		getDiscussion(id);
	}, [getDiscussion, trigger])
	
	const [modal, setModal] = useState({
		      addDiscussion:false,
		  }),
		  [redirect, setRedirect] = useState(false),
		  [token] = useState(localStorage.getItem('token')),
		  [tokenAdmin] = useState(localStorage.getItem('tokenAdmin'));
	
	const onChange = ( name, value ) => {
		if(token || tokenAdmin){
			setModal({ 
			[name] : value
			})
		} else {
			setRedirect(true);
		}
    	
  	}
	
	const {addDiscussion} = modal;
	
	return (
		<>
			{redirect && <Redirect push to="/login" />}
			<div className={styles.Discussion}>
				<div>
					<ForumIcon style={{fill: "#367874"}}/>
					<p>Do you have any questions? Discuss it with our Admin and other user</p>
				</div>
				<button onClick={() => onChange('addDiscussion', true)}>ADD QUESTION</button>
			</div>
			{discussion?.length > 0 ? 
				discussion.map((list, i) => {
			 		return (
			 			<ListDiscussion
							key={i}
							list={list}/>
					)
				})
			: "" }
			<AddDicussion 
				open={addDiscussion}
         		onClose={() => onChange("addDiscussion", false)}/>
		</>
	);
}


const mapStateToProps = state => {
	return {
		discussion: state.discussion.discussion,
		trigger: state.discussion.trigger
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getDiscussion: (productId) => dispatch(actionTypesDiscussion.getDiscussion(productId)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);