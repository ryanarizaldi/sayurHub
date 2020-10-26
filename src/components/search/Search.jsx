import React from "react";
import styles from "./Search.module.css";
import banana from "../../assets/img/banana.png";

export default function Search() {
  return (
    <div className={styles.Container}>
      <div className={styles.Row}>
        <div className={styles.Col}>
          <div className={styles.Header}>
            <h1>Search Products</h1>
          </div>
          <div className={styles.Keyword}>
            <h4>You are searhing for : "Keyword in here"</h4>
          </div>
          <div className={styles.SearchedProducts}>
            <div className={styles.Card}>
              {/* <Link to={`/product/${item._id}`}> */}
              <img
                src={banana}
                // src={item.product_image ? item.product_image : noimg}
                alt="product"
              ></img>
              {/* <h1>{item.product_name}</h1> */}
              <h1>Pisang jumbo</h1>
              <p>Rp. 10.000</p>
              {/* <p>Rp. {priceForm(item.price)}</p> */}
              <button>
                {/* <img src={ShoppingCart} alt="Shopping Cart"></img> */}
                Add to Cart
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
