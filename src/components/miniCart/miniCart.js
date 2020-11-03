import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import styles from "./miniCart.module.css";
import { makeStyles } from "@material-ui/core/styles";

function MiniCart(props) {
  const { open, onClose } = props;

  return (
    <>
      <SwipeableDrawer
        transitionDuration={10000}
        open={open}
        onClose={onClose}
        anchor="right"
        className={styles.Modal}
      >
        <div role="presentation" className={styles.Container}></div>
      </SwipeableDrawer>
    </>
  );
}

export default MiniCart;
