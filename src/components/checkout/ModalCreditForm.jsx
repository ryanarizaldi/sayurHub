import React from "react";
import styles from "./ModalCreditForm.module.css";
import CloseIcon from "@material-ui/icons/Close";
import { Modal } from "@material-ui/core";
import logo from "../../assets/img/cc.png";
import Axios from "axios";
import qs from "qs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

function ModalCreditForm(props) {
  const { open, onClose, amount } = props;
  let history = useHistory();

  const postInput = async (values) => {
    const {
      card_holder,
      card_number,
      exp_month,
      exp_year,
      cvc,
      amount,
    } = values;
    try {
      const submit = await Axios({
        method: "POST",
        url: `https://pacific-oasis-23064.herokuapp.com/payment/charges`,
        data: qs.stringify({
          card_number: card_number,
          exp_month: exp_month,
          exp_year: exp_year,
          cvc: cvc,
          amount: amount,
          currency: "usd",
        }),
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

  const schema = Yup.object().shape({
    card_holder: Yup.string().required("Name is required"),
    card_number: Yup.number().required("Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      card_holder: "",
      card_number: null,
      exp_month: null,
      exp_year: null,
      cvc: null,
      amount: amount,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      postInput(values);
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.ContainerModal}>
        <h2>Payment</h2>
        <h1 onClick={onClose}>
          <CloseIcon />
        </h1>
        <div className={styles.Amount}>
          <h4>Amount to Pay: </h4>
          <p>Rp. {amount}, -</p>
        </div>
        <form className={styles.Form} noValidate onSubmit={formik.handleSubmit}>
          <label className={styles.Label} htmlFor="card_holder">
            Card Holder Name
          </label>
          <input
            name="card_holder"
            id="card_holder"
            type="text"
            className={
              formik.touched.card_holder && formik.errors.card_holder
                ? styles.ErrorInput
                : undefined
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label className={styles.Label} htmlFor="card_number">
            Card Number
          </label>
          <input
            name="card_number"
            id="card_number"
            type="number"
            className={
              formik.touched.card_number && formik.errors.card_number
                ? styles.ErrorInput
                : undefined
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className={styles.Row}>
            <label className={styles.Label} htmlFor="exp_month">
              Exp Month
            </label>
            <input
              name="exp_month"
              id="exp_month"
              type="number"
              className={
                formik.touched.exp_month && formik.errors.exp_month
                  ? styles.ErrorInput
                  : undefined
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className={styles.Label} htmlFor="exp_year">
              Exp Year
            </label>
            <input
              name="exp_year"
              id="exp_year"
              type="number"
              className={
                formik.touched.exp_year && formik.errors.exp_year
                  ? styles.ErrorInput
                  : undefined
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className={styles.Label} htmlFor="cvc">
              CVC
            </label>
            <input
              name="cvc"
              id="cvc"
              type="number"
              className={
                formik.touched.cvc && formik.errors.cvc
                  ? styles.ErrorInput
                  : undefined
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className={styles.ButtonGroup}>
            <button className={styles.CancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.SubmitBtn} type="submit">
              {formik.isSubmitting ? "Please wait..." : "Pay"}
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
