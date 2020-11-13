import React from "react";
import styles from "./ModalCreditForm.module.css";
import CloseIcon from "@material-ui/icons/Close";
import { Modal } from "@material-ui/core";
import logo from "../../assets/img/cc.png";
import Axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";

function ModalCreditForm(props) {
  const { open, onClose } = props;
  let history = useHistory();

  const body = qs.stringify({
    card_number: 4242424242424242,
    exp_month: 12,
    exp_year: 22,
    cvc: 111,
    amount: 11800,
    currency: "usd",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submit = await Axios({
        method: "POST",
        url: `https://pacific-oasis-23064.herokuapp.com/payment/charges`,
        data: body,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: localStorage.getItem("token"),
        },
      });

      if (submit.data.success) {
        window.open(submit.data.data.receipt_url, "_blank");
        onClose();
        history.push("/");
      }
    } catch (error) {}
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.ContainerModal}>
        <h2>Payment</h2>
        <h1 onClick={onClose}>
          <CloseIcon />
        </h1>
        <div className={styles.Amount}>
          <h4>Amount to Pay: </h4>
          <p>Rp. 52.000, -</p>
        </div>
        <form className={styles.Form} noValidate onSubmit={handleSubmit}>
          <label className={styles.Label} for="cardName">
            Card Holder Name
          </label>
          <input name="cardName" id="cardName" type="text" />
          <label className={styles.Label} for="cardNum">
            Card Number
          </label>
          <input name="cardNum" id="cardNum" type="number" />
          <div className={styles.Row}>
            <label className={styles.Label} for="month">
              Exp Month
            </label>
            <input name="month" id="month" type="number" />
            <label className={styles.Label} for="year">
              Exp Year
            </label>
            <input name="year" id="year" type="number" />
            <label className={styles.Label} for="cvc">
              CVC
            </label>
            <input name="cvc" id="cvc" type="number" />
          </div>

          <div className={styles.ButtonGroup}>
            <button className={styles.CancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.SubmitBtn} type="submit">
              Pay
            </button>
          </div>
        </form>
        <div className={styles.Logo}>
          <img src={logo} alt="logo " />
        </div>
      </div>
    </Modal>
  );
}

export default ModalCreditForm;
