import React from "react";
import Product from "../components/productdetail/ProductDets";
import styles from "./Bg.module.css";

export default function ProductDetailPage() {
  window.scrollTo(0, 0);
  return (
    <div className={styles.Wrapper}>
      <Product />
    </div>
  );
}
