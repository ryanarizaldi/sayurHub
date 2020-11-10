import React from "react";
import styles from "./Checkout.module.css";

export default function Checkout() {
  return (
    <div className={styles.Container}>
      <div className={styles.Title}>
        <h1>Billing</h1>
      </div>
      <div className={styles.Invoice}>
        <div className={styles.Thead}>
          <p>Product</p>
          <p>Quantity</p>
          <p>Weight</p>
          <p>Total</p>
        </div>
        <div className={styles.Products}>
          <div className={styles.RowProduct}>
            <p>Pisang Cavendish</p>
            <p>x 1</p>
            <p>2 kg</p>
            <p>Rp. 11.600 ,-</p>
          </div>
        </div>
        <div className={styles.TotalWeight}>
          <p>Total Weight</p>
          <p>1 kg</p>
        </div>
        <div className={styles.Subtotal}>
          <p>Subtotal</p>
          <p>Rp. 11.600 , -</p>
        </div>
        <div className={styles.Shipping}>
          <p>Shipping</p>
          <div className={styles.ShippingOption}>
            <ul>
              <li>
                <input type="radio" id="male" name="gender" value="male" />
                <label for="male">JNE - OKE: RP41,000.00</label>
              </li>
              <li>
                <input type="radio" id="female" name="gender" value="female" />
                <label for="female">JNE - REG: RP43,000.00</label>
              </li>
              <li>
                <input type="radio" id="other" name="gender" value="other" />
                <label for="other">TIKI - ECO: RP45,000.00</label>
              </li>
              <li>
                <input type="radio" id="other1" name="gender" value="other1" />
                <label for="other1">TIKI - REG: RP49,000.00</label>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.TotalPay}>
          <p>Total</p>
          <p>Rp 52.600 ,-</p>
        </div>
        <div className={styles.Button}>
          <button className={styles.Pay}>Pay Now</button>
        </div>
        <div className={styles.SupportPay}>
          <p>* Currently we only use Paypal as a payment method</p>
        </div>
      </div>
    </div>
  );
}
