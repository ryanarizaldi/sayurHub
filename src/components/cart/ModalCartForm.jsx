import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import styles from "./cartModal.module.css";

export default function ModalCartForm() {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const open = () => {
    setOpen(false);
  };

  return (
    <Modal open={open()} onClose={onClose}>
      <div className={styles.ContainerModal}>
        <h1 onClick={onClose}>x</h1>
        <h2>Your order is being processed</h2>
        <p>Awaiting seller's confirmation</p>
        <button onClick={onClose}>OK</button>
      </div>
    </Modal>
  );
}
