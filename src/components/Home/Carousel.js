import React from "react";
import styles from "./Carousel.module.css";
import HeadPic from "../../assets/img/Homepic1.png";
import { Link } from "react-router-dom";
import Banana from "../../assets/img/banana.png";
import Fruit from "../../assets/img/Fruit.png";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, EffectFade, Autoplay, A11y } from "swiper";
import "swiper/swiper-bundle.css";

SwiperCore.use([Pagination, EffectFade, Autoplay, A11y]);

function Carousel() {
  return (
    <div className={styles.carouselContainer}>
      <Swiper
        effect="fade"
        spaceBetween={20}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          bulletClass: styles.paginationBullet,
          bulletActiveClass: styles.paginationBulletActive,
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        <SwiperSlide className={styles.carousel}>
          <div className={styles.Container4}>
            <div
              className={`swiper-pagination ${styles.paginationContainer}`}
            ></div>
          </div>
          <div className={styles.Container}>
            <h1>Fresh Fruits and Vegetables, at Your Doorstep.</h1>
            <img src={HeadPic} alt="Vegetables"></img>
            <a href="#button">
              <button>Browse Product</button>
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.carousel}>
          <div className={styles.Container4}>
            <div
              className={`swiper-pagination ${styles.paginationContainer}`}
            ></div>
          </div>
          <div className={styles.Container3}>
            <div className={styles.Description}>
              <h1>Premium Jumbo Banana!</h1>
              <button>50% OFF!</button>
            </div>
            <img src={Banana} alt="Banana"></img>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.carousel}>
          <div className={styles.Container4}>
            <div
              className={`swiper-pagination ${styles.paginationContainer}`}
            ></div>
          </div>
          <div className={styles.Container2}>
            <h1>Want to buy our products?</h1>
            <Link to="/register">
              <button>SIGN UP NOW</button>
            </Link>
            <img src={Fruit} alt="fruit"></img>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Carousel;
