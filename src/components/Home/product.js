import React, { useState, useEffect, useCallback } from "react";
import styles from "./body.module.css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import axios from "axios";
import noimg from "../../assets/img/noimg.png";
import { Link } from "react-router-dom";

function Product(props) {
  const { category } = props;
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async (cat) => {
    try {
      const prods = await axios.get(
        cat === "all"
          ? `https://pacific-oasis-23064.herokuapp.com/products`
          : `https://pacific-oasis-23064.herokuapp.com/products/filter/${cat}`
      );

      category === "fruits"
        ? setProducts(prods.data.fruits)
        : category === "vegetables"
        ? setProducts(prods.data.vegetable)
        : category === "diets"
        ? setProducts(prods.data.diet)
        : setProducts(prods.data.products);
    } catch (error) {
      console.log("ini error: ", error);
    }
  });

  useEffect(() => {
    getProducts(category);
  }, [category]);

  //https://codepen.io/malasngoding/pen/EedMvv
  const priceForm = (num) => {
    let str = num.toString(),
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
    <>
      {products.length
        ? products.map((item) => (
            <div className={styles.Card} key={item._id}>
              <Link to={`/product/${item._id}`}>
                <img
                  src={item.product_image ? item.product_image : noimg}
                  alt="product"
                ></img>
                <h1>{item.product_name}</h1>
                <p>
                  Rp.{" "}
                  {item.actualPrice
                    ? priceForm(item.actualPrice)
                    : priceForm(item.price)}
                  ,-
                </p>
                <button>
                  <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
                  Add to Cart
                </button>
              </Link>
            </div>
          ))
        : "No products that can be displayed"}
    </>
  );
}

export default Product;
