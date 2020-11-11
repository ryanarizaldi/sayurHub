import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import styles from "./SellerProduct.module.css";
import EditProductModal from "../editProductModal/EditProductModal";
import * as actionTypes from "../../redux/action/Action";

function Product(props) {
  const { list, removeProduct, setTrigger } = props;

  const [modal, setModal] = useState({
    editProduct: false,
    deleteProduct: false,
  });

  const onChange = (name, value) => {
    setModal({
      [name]: value,
    });
    setTrigger();
    console.log("modal is" + modal);
  };

  const { editProduct, deleteProduct } = modal;

  let modale = "";

  if (editProduct) {
    modale = (
      <EditProductModal
        productData={list}
        open={editProduct}
        onChange={onChange}
        onClose={() => onChange("editProduct", false)}
      />
    );
  }

  return (
    <>
      <div key={list._id} className={styles.CardProduct}>
        <img src={list.product_image} alt="seller product" />
        <p>{list.product_name}</p>
        <span>Rp.{list.price}</span>
        <div className={styles.CardButton}>
          <button onClick={() => onChange("editProduct", true)}>Edit</button>
          <button onClick={() => removeProduct(list.product_name)}>
            Delete
          </button>
        </div>
      </div>
      {modale}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTrigger: () => dispatch(actionTypes.setTrigger()),
  };
};

export default connect(null, mapDispatchToProps)(Product);
