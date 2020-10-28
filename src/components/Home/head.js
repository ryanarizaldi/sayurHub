import React from "react";
import styles from "./head.module.css";
import HeadPic from "../../assets/img/Homepic1.png";
import PicTop from "../../assets/img/Homepic2.png";
import PicBottom from "../../assets/img/Homepic3.png";
import Banana from "../../assets/img/banana.png";
import ShoppingCart from "../../assets/img/shopping-cart.png";

function Head() {
  return (
    <div className={styles.Background}>
      <div className={styles.Container}>
        <h1>Fresh Fruits and Vegetables, at Your Doorstep.</h1>
        <img src={HeadPic} alt="Vegetables"></img>
        <button>Browse Product</button>
      </div>
      <div className={styles.Ads}>
        <div className={styles.ContainerBanana}>
          <div className={styles.Banana}>
            <img src={Banana} alt="Banana"></img>
            <button>50% OFF!</button>
          </div>
          <div className={styles.Description}>
            <p>FRUITS</p>
            <h1>Premium Jumbo Banana!</h1>
            <p>The only banana you'll ever need.</p>
            <p>Rp. 90.000,-</p>
            <h2>Rp. 45.000,-</h2>
            <button>
              <img src={ShoppingCart} alt="shopping cart"></img>
              Add to Cart
            </button>
          </div>
        </div>
        <div className={styles.Tomato}>
          <img src={PicBottom} alt="top"></img>
          <img src={PicTop} alt="bottom"></img>
          <h1>Special Offers!</h1>
          <button>SEE ALL OFFERS</button>
        </div>
      </div>
    </div>
  );
}

export default Head;
