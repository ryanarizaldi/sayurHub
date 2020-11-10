import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./AdminDashboard.module.css";
import Products from "../sellerProduct/SellerProduct";
import Notification from "../notification/Notification";
import UserList from "../userList/UserList";
import History from "../history/UserHistory";
import CreateProductModal from "../createProductModal/CreateProductModal";
import { NavLink, Route } from "react-router-dom";
import ModalEdit from "./ModalEditUser";
import * as actionTypes from "../../redux/action/Action";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Row}>
        <div className={styles.Wrapper}>
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
                <NavLink
                  to="/dashboard/admin/users"
                  activeClassName={styles.Active}
                >
                  Users
                </NavLink>
                <button
                  className={styles.CreateButton}
                  onClick={() => onChange("createProduct", true)}
                >
                  Create Product
                </button>
              </div>

              <div className={styles.Hamburger}>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MenuIcon />
                </Button>
                <Menu
                  className={styles.Coba}
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      to="/dashboard/admin/products"
                      activeClassName={styles.Active}
                    >
                      Products
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      to="/dashboard/admin/history"
                      activeClassName={styles.Active}
                    >
                      Transaction History
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      to="/dashboard/admin/notification"
                      activeClassName={styles.Active}
                    >
                      Notification
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      to="/dashboard/admin/users"
                      activeClassName={styles.Active}
                    >
                      Users
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={() => onChange("createProduct", true)}>
                    Create Product
                  </MenuItem>
                </Menu>
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
              <Route path="/dashboard/admin/users">
                <UserList />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAdmin: () => dispatch(actionTypes.getAdmin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
