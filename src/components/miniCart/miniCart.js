import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypesCart from "../../redux/action/ActionCart";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ListCart from "./ListCart";
import styles from "./miniCart.module.css";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

function MiniCart(props) {
  const { open, onClose, getCart, cart, totalPrice, trigger, onOpen } = props;

  useEffect(() => {
    getCart();
  }, [getCart, trigger]);
	
  const priceForm = (num) => {
    let str = String(num),
      split = str.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return rupiah;
  };

  return (
    <>
      <SwipeableDrawer
        open={open}
        onOpen={onOpen}
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
              ? cart.items.map((list) => <ListCart priceForm={priceForm} list={list} key={list.id} />)
              : "There is no Cart added"}
          </Scrollbars>
          <div className={styles.Subtotal}>
            <p>Subtotal:</p>
            <p>Rp.{priceForm(totalPrice)}</p>
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
