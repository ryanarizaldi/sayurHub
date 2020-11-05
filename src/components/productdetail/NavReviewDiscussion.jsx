import React from "react";
import Review from "../review/Review";
import Discussion from "../discussion/Discussion";
import styles from "./NavReviewDiscussion.module.css";
import { NavLink, Route } from "react-router-dom";

export default function NavReviewDiscussion(props) {
  const { id } = props;
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Navigation}>
        <NavLink to={`/product/${id}/review/`} activeClassName={styles.Active}>
          Review
        </NavLink>
        <NavLink
          to={`/product/${id}/discussion/`}
          activeClassName={styles.Active}
        >
          Discussion
        </NavLink>
      </div>
      <div className={styles.Content}>
        <Route path={`/product/:id?/review/`}>
          <Review id={id} />
        </Route>
        <Route path="/product/:id?/discussion/">
          <Discussion id={id} />
        </Route>
      </div>
    </div>
  );
}
