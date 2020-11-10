import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import styles from "./UserDashboard.module.css";
import ReactStars from "react-stars";
import Products from "../sellerProduct/SellerProduct";
import Notification from "../notification/Notification";
import History from "../history/UserHistory";
import CreateProductModal from "../createProductModal/CreateProductModal";
import { NavLink, Route } from "react-router-dom";
import ModalEdit from "./ModalEditUser";
import * as actionTypes from "../../redux/action/Action";
import SkeletonProfile from "../skeletons/SkeletonProfile";

function UserDashboard(props) {
  const { userData, getUser, loading } = props;

  const [modal, setModal] = useState({
      editProfile: false,
    }),
    [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    getUser();
  }, [getUser, token]);

  const onChange = (name, value) => {
    setModal({
      [name]: value,
    });
    console.log("modal is" + modal);
  };
  const { editProfile } = modal;
  let modale = "";
  if (editProfile) {
    modale = (
      <ModalEdit
        open={editProfile}
        userData={userData}
        onClose={() => onChange("editProfile", false)}
      />
    );
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Row}>
        <div className={styles.Wrapper}>
          <div className={styles.ColUser}>
            {!loading ? (
              <div className={styles.UserCard}>
                <img src={userData.profile_image} alt="user profile" />
                <p>{userData.full_name}</p>
                <p>{userData.description}</p>
                <button onClick={() => onChange("editProfile", true)}>
                  Edit Profile
                </button>
              </div>
            ) : (
              <SkeletonProfile />
            )}
          </div>
          <div className={styles.ColDasboard}>
            <div className={styles.DashboardCard}>
              <div className={styles.Navigation}>
                <NavLink
                  to="/dashboard/history"
                  activeClassName={styles.Active}
                >
                  Transaction History
                </NavLink>
                <NavLink
                  to="/dashboard/notification"
                  activeClassName={styles.Active}
                >
                  Notification
                </NavLink>
              </div>
              <Route path="/dashboard/history">
                <History />
              </Route>
              <Route path="/dashboard/notification">
                <Notification />
              </Route>
            </div>
          </div>
          {modale}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.index.userData,
    loading: state.index.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(actionTypes.getUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
