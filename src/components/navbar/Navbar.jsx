import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/img/logo.svg";
import searchicon from "../../assets/img/searchicon.png";
import * as actionTypes from "../../redux/action/Action";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

function Navbar(props) {
  const { userData, getUser, logout, token } = props;

  const [currentToken] = token;

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [currentToken, getUser]);
  //   const [token, setToken] = useState();
  //   //   const token = localStorage.getItem("token");

  //   useEffect(() => {
  //     setToken(localStorage.getItem("token"));
  //   }, []);

  //   useEffect(() => {
  //     if (token) {
  //       getUser();
  //     }
  //   }, [token, getUser]);

  return (
    <div className={styles.Background}>
      <div className={styles.Container}>
        <div className={styles.Logo}>
          <img src={logo} alt="logo"></img>
        </div>
        <div className={styles.Box}>
          <img src={searchicon} alt="search ico"></img>
        </div>
        <div className={styles.Searchbox}>
          <input
            type="text"
            placeholder="Search Porduct..."
            name="search"
          ></input>
        </div>
        {!token ? (
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
            <NavLink to="/cart" className={styles.Cart}>
              <ShoppingCartOutlinedIcon style={{ fill: "#367874" }} />
            </NavLink>
            <NavLink to="/dashboard" className={styles.Sell}>
              <button>SELL PRODUCT</button>
            </NavLink>
            <div className={styles.Dropdown}>
              <img src={userData.profile_image} alt="profile"></img>
              <div className={styles.DropdownContent}>
                <NavLink to="/dashboard">User Dashboard</NavLink>
                <NavLink to="/" onClick={logout}>
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    token: state.token,
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(actionTypes.getUser()),
    logout: () => dispatch(actionTypes.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
