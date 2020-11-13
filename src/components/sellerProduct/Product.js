import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./SellerProduct.module.css";
import Swal from "sweetalert2";
import EditProductModal from "../editProductModal/EditProductModal";
import * as actionTypes from "../../redux/action/Action";
import axios from "axios";

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

  const { editProduct } = modal;

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

  const priceForm = (num) => {
    let str = num.toString(),
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
      <div key={list._id} className={styles.CardProduct}>
		<div className={styles.Cag}>{list.category}</div>
        <img src={list.product_image} alt="seller product" />
        <p>{list.product_name}</p>
        <span>Rp.{priceForm(list.price)},-</span>
        <div className={styles.CardButton}>
          <button onClick={() => onChange("editProduct", true)}>Edit</button>
          <button onClick={() => removeProduct(list._id)}>Delete</button>
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
