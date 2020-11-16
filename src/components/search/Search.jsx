import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useParams } from "react-router-dom";
import Axios from "axios";

export default function Search() {
  const [products, setProduct] = useState([]);
  const { keyword } = useParams();

  const searchProd = async () => {
    try {
      const getMe = await Axios.post(
        `https://pacific-oasis-23064.herokuapp.com/products/find/${keyword}`
      );

      setProduct(getMe.data.found);
    } catch (error) {
      console.log("error search", error);
    }
  };

  useEffect(() => {
    searchProd();
  }, [keyword, searchProd]);

  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.Row}>
          <div className={styles.Col}>
            <div className={styles.Header}>
              <h1>Search Products</h1>
            </div>
            <div className={styles.Keyword}>
              <h4>You are searhing for : "{keyword}"</h4>
            </div>
            <div className={styles.SearchedProducts}>
              {products.length
                ? products.map((item) => (
                    <div className={styles.Card} key={item._id}>
                      <Link to={`/product/${item._id}`}>
                        <img src={item.product_image} alt="product"></img>
                        <h1>{item.product_name}</h1>
                        <p>Rp. {item.price},-</p>
                        <button>
                          <ShoppingCartOutlinedIcon />
                          Add to Cart
                        </button>
                      </Link>
                    </div>
                  ))
                : `We can't found what you are looking for`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
