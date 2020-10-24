import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
import axios from "axios";
import styles from "./ProductDets.module.css";
import seller from "../../assets/img/seller_photo.png";

export default function ProductDets() {
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProduct();
  }, []);

  const { id } = useParams();
  const getProduct = async () => {
    console.log("object");
    try {
      console.log(id);
      const callmebabe = await axios.get(
        `https://pacific-oasis-23064.herokuapp.com/products/${id}`
      );
      setProduct(callmebabe.data.products);
    } catch (error) {
      console.log("errorgan", error);
    }
  };

  //https://codepen.io/malasngoding/pen/EedMvv
  const priceForm = (num) => {
    let str = String(num),
      split = str.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return rupiah;
  };
  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.CardDetail}>
          <div className={styles.ImageProd}>
            <img src={product.product_image} alt="product photo" />
          </div>
          <div className={styles.Content}>
            <h3>{product.product_name}</h3>
            <div className={styles.Rate}>
              <ReactStars value={5} size={24} color2={"#ffd700"} edit={false} />
            </div>
            <div className={styles.Price}>
              <span>Rp 90.000 ,-</span>
              <h5>Rp {priceForm(product.price)},-</h5>
            </div>
            <div className={styles.QuantyAndStock}>
              <div className={styles.Quantity}>
                <p>Quantity: </p>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
              <div className={styles.Stock}>
                <p>Stock: 100</p>
              </div>
            </div>

            <div className={styles.Seller}>
              <img src={product.product_image} alt="seller photo" />
              <div className={styles.SellerInfo}>
                <p>Banana Lovers</p>
                <button>Seller Details</button>
              </div>
            </div>
            <div className={styles.AddToCart}>
              <button>Add to Cart</button>
              <button>Add Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
