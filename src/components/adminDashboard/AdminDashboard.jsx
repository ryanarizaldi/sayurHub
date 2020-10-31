import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./AdminDashboard.module.css";
import ReactStars from "react-stars";
import Products from "../sellerProduct/SellerProduct";
import Notification from "../notification/Notification";
import History from "../history/UserHistory";
import CreateProductModal from "../createProductModal/CreateProductModal";
import { NavLink, Route } from "react-router-dom";
import ModalEdit from "./ModalEditUser";
import * as actionTypes from "../../redux/action/Action";
import admin from "../../assets/img/admin.jpg";

function AdminDashboard(props) {
  const { userData, getAdmin } = props;

  const [modal, setModal] = useState({
      createProduct: false,
      editProfile: false,
    }),
    [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    getAdmin();
  }, [getAdmin, token]);

  const onChange = (name, value) => {
    setModal({
      [name]: value,
    });
    console.log("modal is" + modal);
  };

  const { createProduct, editProfile } = modal;

  let modale = "";

  if (createProduct) {
    modale = (
      <CreateProductModal
        open={createProduct}
        onChange={onChange}
        onClose={() => onChange("createProduct", false)}
      />
    );
  } else if (editProfile) {
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
            <div className={styles.UserCard}>
              <img src={admin} alt="user profile" />
              <p>ADMIN</p>
              {/* <ReactStars value={5} edit={false} size={20} /> */}
              {/* <button onClick={() => onChange("editProfile", true)}>
                Edit Profile
              </button> */}
              <button
                className={styles.CreateButton}
                onClick={() => onChange("createProduct", true)}
              >
                Create Product
              </button>
            </div>
          </div>
          <div className={styles.ColDasboard}>
            <div className={styles.DashboardCard}>
              <div className={styles.Navigation}>
                <NavLink
                  to="/dashboard/admin/products"
                  activeClassName={styles.Active}
                >
                  Products
                </NavLink>
                <NavLink
                  to="/dashboard/admin/history"
                  activeClassName={styles.Active}
                >
                  Transaction History
                </NavLink>
                <NavLink
                  to="/dashboard/admin/notification"
                  activeClassName={styles.Active}
                >
                  Notification
                </NavLink>
                <button
                  className={styles.CreateButton}
                  onClick={() => onChange("createProduct", true)}
                >
                  Create Product
                </button>
              </div>

              <Route path="/dashboard/admin/products">
                <Products />
              </Route>
              <Route path="/dashboard/admin/history">
                <History />
              </Route>
              <Route path="/dashboard/admin/notification">
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
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAdmin: () => dispatch(actionTypes.getAdmin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
