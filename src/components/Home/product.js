import React, { useState, useEffect, useCallback } from "react";
import styles from "./body.module.css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import axios from "axios";
import noimg from "../../assets/img/noimg.png";
import { Link } from "react-router-dom";
import SkeletonProduct from "../skeletons/SkeletonProduct";
import InfiniteScroll from "react-infinite-scroller";

function Product(props) {
  const { category } = props,
    [products, setProducts] = useState([]),
    [loading, setLoading] = useState(false),
    [page, setPage] = useState(1),
    [totalPage, setTotal] = useState(0);

  const getProducts = useCallback(async (cat) => {
    setLoading(true);
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
        ? setProducts(prods.data.diets)
        : setProducts(prods.data.posts);
      setTotal(prods.data.totalPages);
      setLoading(false);
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

  const getMore = async (cat) => {
    const newPage = page + 1;
    console.log("ini newpage", newPage);
    setPage(newPage);

    console.log("masuk ", cat);
    setLoading(true);
    try {
      const prods = await axios.get(
        cat === "all"
          ? `https://pacific-oasis-23064.herokuapp.com/products?page=${newPage}`
          : `https://pacific-oasis-23064.herokuapp.com/products/filter/${cat}?page=${newPage}`
      );

      console.log("ini page: ", newPage);

      category === "fruits"
        ? setProducts(prods.data.fruits)
        : category === "vegetables"
        ? setProducts(prods.data.vegetable)
        : category === "diets"
        ? setProducts(prods.data.diets)
        : setProducts([...products, ...prods.data.posts]);
      console.log(products, prods);
      setLoading(false);
    } catch (error) {
      console.log("ini error: ", error.response);
    }
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
                <button>
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
