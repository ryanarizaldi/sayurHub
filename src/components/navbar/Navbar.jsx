import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/img/logo.svg";
import searchicon from "../../assets/img/searchicon.png";
import * as actionTypes from "../../redux/action/Action";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Skeleton from "../skeletons/Skeletons";
import AdminIco from "../../assets/img/admin.jpg";
import noimg from "../../assets/img/noimg.png";
import MiniCart from "../miniCart/miniCart";


function Navbar(props) {
  const {
    userData,
    logout,
    token,
    tokenAdmin,
    getUser,
    getAdmin,
    loading,
  } = props;

  const [modal, setModal] = useState({
	  sideDrawer: false
  })
	
  const onChange = ( name, value ) => {
      setModal({ 
		  [name] : value
	  })
	  console.log("modal is" + modal);
  }

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
          <input
            type="text"
            placeholder="Search Porduct..."
            name="search"
          ></input>
        </div>
        <div>
          <label className={styles.Hamburger} for="toggle">&#9776;</label>
          <input className={styles.Toggle} type="checkbox" id="toggle"/>
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
					  onClick={() => onChange('sideDrawer', true)}/>
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
				   onClose={() => onChange('sideDrawer', false)}/>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    userData: state.userData,
    tokenAdmin: state.tokenAdmin,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(actionTypes.getUser()),
    getAdmin: () => dispatch(actionTypes.getAdmin()),
    logout: () => dispatch(actionTypes.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
