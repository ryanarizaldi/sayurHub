import React from "react";
import { connect } from "react-redux";
import * as actionTypesCart from "../../redux/action/ActionCart";

import styles from "./miniCart.module.css";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import Swal from "sweetalert2";

function ListCart(props) {
  const { getCart, cart } = props;

  const actualRemove = async (cartId, productId) => {
    try {
      const remove = await axios({
        method: "delete",
        url: `https://pacific-oasis-23064.herokuapp.com/cart/delete/${cartId}/${productId}`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log("remove response", remove);
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = (cartId, productId) => {
    Swal.fire({
      title: `Delete this product?`,
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        actualRemove(cartId, productId);
        getCart();
        Swal.fire("Deleted!", `this product has been deleted.`, "success");
      }
    });
  };

  const { list } = props;

  return (
    <div className={styles.Cart}>
      <div>
        <img src={list.image} alt={list.name}></img>
      </div>
      <div>
        <h1>{list.name}</h1>
        <p>
          {list.quantity} x Rp.{list.price}
        </p>
      </div>
      <div>
        <CloseIcon
          onClick={() => removeProduct(cart._id, list.id)}
          className={styles.IconDelete}
          fontSize="small"
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: () => dispatch(actionTypesCart.getCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCart);
