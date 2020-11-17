import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actionTypesCart from "../../redux/action/ActionCart";
import styles from "./cart.module.css";
import Order from "./order";
import Shipping from "./ModalFormShipping";
// import CartModal from "./cartModal";
import axios from "axios";
import Swal from "sweetalert2";

function Cart(props) {
  const [trigger, setTrigger] = useState(false);
  const [shipping, setShip] = useState(false);

  const { cart, getCart, totalPrice } = props;
	
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

  const actualRemove = async (cartId) => {
    try {
      const remove = await axios({
        method: "delete",
        url: `https://pacific-oasis-23064.herokuapp.com/cart/empty/${cartId}`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log("remove response", remove);
    } catch (error) {
      console.log(error);
    }
  };

  const emptyCart = (cartId) => {
    Swal.fire({
      title: `Delete all items in cart?`,
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        actualRemove(cartId);
        setTrigger(true);
        Swal.fire("Deleted!", `this product has been deleted.`, "success");
      }
    });
  };

  useEffect(() => {
    getCart();
  }, [getCart, trigger]);

  return (
    <div className={styles.Container}>
      {shipping && (
        <Shipping
          open={shipping}
          onClose={() => setShip(false)}
          totalPrice={totalPrice}
          idCart={cart._id}
        />
      )}
      <div className={styles.Title}>
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total Price</p>
        <p>Action</p>
      </div>
      {cart.items?.length > 0
        ? cart.items.map((item, i) => {
            return (
              <Order
				priceForm={priceForm}
                i={i}
                key={i}
                trigger={trigger}
                cart={cart}
                getCart={getCart}
                item={item}
              />
            );
          })
        : "there's no cart added"}

      <hr></hr>
      <div className={styles.Checkout}>
        <h2>Sub Total:</h2>
        <p>Rp.{priceForm(totalPrice)}</p>
        <button className={styles.BtnCheckout} onClick={() => setShip(true)}>
          CHECKOUT
        </button>
        <button onClick={() => emptyCart(cart._id)} className={styles.Empty}>
          EMPTY CART
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    totalPrice: state.cart.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: () => dispatch(actionTypesCart.getCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
