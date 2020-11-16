import React from "react";
import styles from "./Notification.module.css";
import banana from "../../assets/img/banana.png";
import grape from "../../assets/img/prod_grapes.png";
import lemon from "../../assets/img/prod_lemon.png";
// import cabbage from '../../assets/img/prod_cabbage.png';

export default function UserHistory() {
  return (
    <div className={styles.History}>
      <div className={styles.ProductHistory}>
        <img src={lemon} alt="productpic" />
        <div className={styles.Text}>
          <p>Lemon</p>
          <p>Rp 5.000.000</p>
          <p>50 qty</p>
        </div>
        <span>Awaiting your payment</span>
      </div>
      <div className={styles.ProductHistory}>
        <img src={banana} alt="productpic" />
        <div className={styles.Text}>
          <p>Banana</p>
          <p>Rp 10.000</p>
          <p>1 qty</p>
        </div>
        <span>Payment Success</span>
      </div>
      {/* <div className={styles.ProductHistory}>
                <img src={grape} alt="productpic"/>
                <div className={styles.Text}>
                    <p>Amer</p>
                    <p>Rp 5.000.000</p>
                    <p>50 qty</p>
                </div>
                <span className={styles.Canceled}>Dont</span>
            </div> */}
    </div>
  );
}
