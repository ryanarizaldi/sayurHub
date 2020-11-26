import React, { useEffect, useState } from "react";
import styles from "./head.module.css";
import HeadPic from "../../assets/img/Homepic1.png";
import Carousel from './Carousel';
import PicTop from "../../assets/img/Homepic2.png";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PicBottom from "../../assets/img/Homepic3.png";
import Banana from "../../assets/img/banana.png";
import SkeletonHomeHead from "../skeletons/SkeletonHomeHead";

function Head() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className={styles.Background}>
      {loading ? (
        <SkeletonHomeHead />
      ) : (
        <>
          <Carousel />

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
                  <ShoppingCartOutlinedIcon />
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
        </>
      )}
    </div>
  );
}

export default Head;
