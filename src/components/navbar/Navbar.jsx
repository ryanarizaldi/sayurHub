import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/img/logo.svg";
import searchicon from "../../assets/img/searchicon.png";
import * as actionTypes from "../../redux/action/Action";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Skeleton from "../skeletons/Skeletons";
import AdminIco from "../../assets/img/admin.jpg";

import MiniCart from "../miniCart/miniCart";

function Navbar(props) {
  const {
	cart,
    userData,
    logout,
    token,
    tokenAdmin,
    getUser,
    getAdmin,
    loading,
  } = props;

  const [modal, setModal] = useState({
    sideDrawer: false,
  });
	


  const onChange = (name, value, e) => {
    setModal({
      [name]: value,
    });
    console.log("modal is" + modal);
  };

  useEffect(() => {
    getUser();
  }, [token, getUser, tokenAdmin]);

  const { sideDrawer } = modal;

  return (
    <div className={styles.Background}>
      <div className={styles.Container}>
        <div className={styles.Logo}>
          <NavLink to="/">
            <img src={logo} alt="logo"></img>
          </NavLink>
        </div>
        <div className={styles.Box}>
          <img src={searchicon} alt="search"></img>
        </div>
        <div className={styles.Searchbox}>
          <input
            type="text"
            placeholder="Search Porduct..."
            name="search"
          ></input>
        </div>
        {!token && !tokenAdmin ? (
          <div className={styles.DivNav}>
            <NavLink to="/register" className={styles.Signup}>
              <button>Sign Up</button>
            </NavLink>
            <NavLink to="/login" className={styles.Login}>
              Log In
            </NavLink>
          </div>
        ) : (
          <div className={styles.DivNav}>
            {tokenAdmin ? (
              <>
                <NavLink to="/dashboard/admin/products" className={styles.Sell}>
                  <button>SELL PRODUCT</button>
                </NavLink>
                <div className={styles.Dropdown}>
                  <img src={AdminIco} alt="profile" />
                  <div className={styles.DropdownContent}>
                    <NavLink to="/dashboard/admin/products">Dashboard</NavLink>
                    <NavLink to="/" onClick={logout}>
                      Logout
                    </NavLink>
                  </div>
                </div>
              </>
            ) : (
              <>
                <ShoppingCartOutlinedIcon
                  className={styles.Cart}
                  style={{ fill: "#367874" }}
				  fontSize="big"
                  onClick={() => onChange("sideDrawer", true)}
                />
				{ cart.items?.length > 0 ? <div className={styles.Notification} onClick={() => onChange("sideDrawer", true)}></div>
				 : "" }
                {!loading ? (
                  <div className={styles.Dropdown}>
                    <img src={userData.profile_image} alt="user"></img>
                    <div className={styles.DropdownContent}>
                      <NavLink to="/dashboard/history">User Dashboard</NavLink>
                      <NavLink to="/" onClick={logout}>
                        Logout
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <Skeleton type="navbar" />
                )}
              </>
            )}
          </div>
        )}
        <MiniCart
          open={sideDrawer}
          onClose={() => onChange("sideDrawer", false)}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.index.token,
    userData: state.index.userData,
    tokenAdmin: state.index.tokenAdmin,
    loading: state.index.loading,
	cart: state.cart.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(actionTypes.getUser()),
    getAdmin: () => dispatch(actionTypes.getAdmin()),
    logout: () => dispatch(actionTypes.logout()),
  };
};

function usePrevious(value) {
	const ref = useRef();
 	useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
