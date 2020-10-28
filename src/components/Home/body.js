import React from "react";
import styles from "./body.module.css";
import Product from "./product";

function Body() {
  return (
    <div className={styles.Container}>
      <div className={styles.Button}>
        <button className={styles.Active} id="button">All</button>
        <button>Fruits</button>
        <button>Vegetables</button>
        <button>Diet</button>
      </div>
      <div className={styles.ContainerProduct}>
        <Product />
      </div>
    </div>
  );
}

export default Body;
