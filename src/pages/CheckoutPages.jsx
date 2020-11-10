import React from "react";
import Checkout from "../components/checkout/Checkout";
import styles from "./Bg.module.css";

export default function CheckoutPages() {
  return (
    <div className={styles.Wrapper}>
      <Checkout />
    </div>
  );
}
