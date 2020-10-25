import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
import axios from "axios";
import styles from "./ProductDets.module.css";
import seller from "../../assets/img/seller_photo.png";
import noimg from "../../assets/img/noimg.png";
import AddReview from "../review/ModalAddReview";

export default function ProductDets() {
  const [product, setProduct] = useState({});
  const [seller, setSellers] = useState({});
  const [rating, setRating] = useState(0);
  const [modal, setModal] = useState({
    addReview: false,
  });
  const { id } = useParams();

  const getRating = async () => {
    try {
      const rates = await axios.get(
        `https://pacific-oasis-23064.herokuapp.com/reviews/rating/${id}`
      );
      setRating(rates.data.average_rating);
    } catch (error) {}
  };
  const onChange = (name, value) => {
    setModal({
      [name]: value,
    });
  };

  useEffect(() => {
    getProduct();
    getRating();
  }, []);

  const getProduct = async () => {
    try {
      const callmebabe = await axios.get(
        `https://pacific-oasis-23064.herokuapp.com/products/${id}`
      );
      setProduct(callmebabe.data.products);
      setSellers(callmebabe.data.products.user);
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
            <img
              src={product.product_image ? product.product_image : noimg}
              alt="product"
            />
          </div>
          <div className={styles.Content}>
            <h3>{product.product_name}</h3>
            <div className={styles.Rate}>
              <ReactStars
                value={rating ? rating : 0}
                size={48}
                color2={"#ffd700"}
                edit={false}
              />
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
                <p>Stock: {product.stock}</p>
              </div>
            </div>

            <div className={styles.Seller}>
              <img src={seller ? seller.profile_image : noimg} alt="seller" />
              <div className={styles.SellerInfo}>
                <p>{seller ? seller.full_name : "seller not found"}</p>
                {seller && <button>Seller Details</button>}
              </div>
            </div>
            <div className={styles.AddToCart}>
              <button>Add to Cart</button>
              <button onClick={() => onChange("addReview", true)}>
                Add Review
              </button>
              {modal.addReview && (
                <AddReview
                  open={modal.addReview}
                  onClose={() => onChange("addReview", false)}
                  prod={id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
