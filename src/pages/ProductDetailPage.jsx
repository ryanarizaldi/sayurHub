import React from "react";
import Product from "../components/productdetail/ProductDets";
import styles from "./Bg.module.css";

export default function ProductDetailPage() {
  return (
    <div className={styles.Wrapper}>
      <Product />
    </div>
  );
}
