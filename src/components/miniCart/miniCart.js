import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypesCart from "../../redux/action/ActionCart";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ListCart from "./ListCart";
import styles from "./miniCart.module.css";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Robert from "../../assets/img/robert.png";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

function MiniCart(props) {
  const { open, onClose, getCart, cart, totalPrice, trigger } = props;

  useEffect(() => {
    getCart();
  }, [getCart, trigger]);

  return (
    <>
      <SwipeableDrawer
        open={open}
        onClose={onClose}
        anchor="right"
        className={styles.Modal}
        transitionDuration={500}
      >
        <div className={styles.Container}>
          <CloseIcon
            className={styles.CloseIcon}
            fontSize="large"
            onClick={onClose}
          />
          <h1 className={styles.Title}>Shopping Cart</h1>
          <Scrollbars style={{ width: "100%", height: 300 }}>
            {cart.items?.length > 0
              ? cart.items.map((list) => <ListCart list={list} key={list.id} />)
              : "There is no Cart added"}
          </Scrollbars>
          <div className={styles.Subtotal}>
            <p>Subtotal:</p>
            <p>Rp.{totalPrice}</p>
          </div>
          <div className={styles.Button}>
            <Link to="/cart">
              <button onClick={onClose}>View Cart</button>
            </Link>
            {/* <Link to="#">
              <button>Checkout</button>
            </Link> */}
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    totalPrice: state.cart.totalPrice,
    trigger: state.cart.trigger,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: () => dispatch(actionTypesCart.getCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
