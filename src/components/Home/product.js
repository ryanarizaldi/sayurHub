import React, { useState, useEffect, useCallback } from "react";
import styles from "./body.module.css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import axios from "axios";
import noimg from "../../assets/img/noimg.png";
import { Link } from "react-router-dom";
import SkeletonProduct from "../skeletons/SkeletonProduct";
import InfiniteScroll from "react-infinite-scroller";

function Product(props) {
  const { category, loading, products, page, totalPage, getMore } = props;

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
    <InfiniteScroll
      initialLoad={false}
      loadMore={() => getMore(category)}
      hasMore={page < totalPage}
      loader={[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
        <SkeletonProduct key={n} />
      ))}
    >
      {products.length || !loading
        ? products.map((item) => (
            <div className={styles.Card} key={item._id}>
              <Link to={`/product/${item._id}/review`}>
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
                <button onClick={() => console.log("haiii")}>
                  <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
                  Add to Cart
                </button>
              </Link>
            </div>
          ))
        : [1, 2, 3, 4, 5, 6, 7, 8].map((n) => <SkeletonProduct key={n} />)}
      {!products.length && "There isn't any product in this category"}
    </InfiniteScroll>
  );
}

export default Product;
