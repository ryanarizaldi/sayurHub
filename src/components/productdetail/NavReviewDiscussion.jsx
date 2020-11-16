import React, {useEffect} from "react";
import Review from "../review/Review";
import {connect} from 'react-redux';
import * as actionTypesDiscussion from "../../redux/action/ActionDiscussion";
import * as actionTypes from "../../redux/action/Action";

import Discussion from "../discussion/Discussion";
import styles from "./NavReviewDiscussion.module.css";
import { NavLink, Route } from "react-router-dom";

function NavReviewDiscussion(props) {
  const { id, review, discussion, getReview, getDiscussion } = props;
	
  useEffect(() => {
	  getReview(id);
	  getDiscussion(id);
  }, [])

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Navigation}>
        <NavLink to={`/product/${id}/review/`} activeClassName={styles.Active}>
          Review({review.length})
        </NavLink>
        <NavLink
          to={`/product/${id}/discussion/`}
          activeClassName={styles.Active}
        >
          Discussion({discussion.length})
        </NavLink>
      </div>
      <div className={styles.Content}>
        <Route path={`/product/:id?/review/`}>
          <Review id={id} />
        </Route>
        <Route path={`/product/:id?/discussion/`}>
          <Discussion id={id} />
        </Route>
      </div>
    </div>
  );
}


const mapStateToProps = state => {
	return {
		discussion: state.discussion.discussion,
		review: state.index.review
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getReview: (id) => dispatch(actionTypes.getReview(id)),
		getDiscussion: (productId) => dispatch(actionTypesDiscussion.getDiscussion(productId))
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavReviewDiscussion);