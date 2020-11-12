import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import styles from "./ModalFormShipping.module.css";
import { Redirect } from "react-router";
import CloseIcon from "@material-ui/icons/Close";

// import { Redirect } from "react-router-dom";

export default function ModalFormShipping(props) {
  const { open, onClose } = props;

  const referme = () => {
    return <Redirect to="/" />;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.ContainerModal}>
        <h2>Shipping</h2>
        <h1 onClick={onClose}>
          <CloseIcon />
        </h1>
        <form className={styles.Form} onSubmit={referme} noValidate>
          <label className={styles.Label} for="firstName">
            First Name
          </label>
          <input name="firstName" id="firstName" type="text" />
          <label className={styles.Label} for="lastName">
            Last Name
          </label>
          <input name="lastName" id="lastName" type="text" />
          <div className={styles.Row}>
            <label className={styles.Label} for="email">
              Email
            </label>
            <input name="email" id="email" type="email" />
            <label className={styles.Label} for="phone">
              Phone
            </label>
            <input name="phone" id="phone" type="number" />
          </div>

          <label className={styles.Label} for="state">
            Province
          </label>
          <select name="state" id="state">
            <option disabled></option>
            <option value="jakarata">DKI Jakarta</option>
            <option value="papua">papua</option>
          </select>
          <label className={styles.Label} for="city">
            City
          </label>
          <select name="city" id="city">
            <option disabled></option>
            <option value="jakarata">Jakarta Pusat</option>
            <option value="papua">Jakarta Tenggara</option>
          </select>
          <label className={styles.Label} for="address">
            Address
          </label>
          <input id="address" name="address" type="text" />

          <div className={styles.ButtonGroup}>
            <button className={styles.CancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.SubmitBtn} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
