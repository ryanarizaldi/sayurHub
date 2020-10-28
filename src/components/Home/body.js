import React, { useState } from "react";
import styles from "./body.module.css";
import Product from "./product";

function Body() {
  const [category, setCat] = useState("diets");
  return (
    <div className={styles.Container}>
      <div className={styles.Button}>
        <button
          className={category === "all" && styles.Active}
          onClick={() => setCat("all")}
          id="button"
        >
          All
        </button>
        <button
          className={category === "fruits" && styles.Active}
          onClick={() => setCat("fruits")}
          id="button"
        >
          Fruits
        </button>
        <button
          className={category === "vegetables" && styles.Active}
          onClick={() => setCat("vegetables")}
          id="button"
        >
          Vegetables
        </button>
        <button
          className={category === "diets" && styles.Active}
          onClick={() => setCat("diets")}
          id="button"
        >
          Diet
        </button>
      </div>
      <div className={styles.ContainerProduct}>
        <Product category={category} />
      </div>
    </div>
  );
}

export default Body;
