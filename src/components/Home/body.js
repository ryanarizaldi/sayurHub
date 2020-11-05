import React, { useState, useEffect, useCallback } from "react";
import styles from "./body.module.css";
import axios from "axios";
import Product from "./product";

function Body() {
  const [category, setCat] = useState("all"),
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
      setPage(1);
      setLoading(false);
    } catch (error) {
      console.log("ini error: ", error);
    }
  });

  useEffect(() => {
    getProducts(category);
  }, [category]);

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
        ? setProducts([...products, ...prods.data.fruits])
        : category === "vegetables"
        ? setProducts([...products, ...prods.data.vegetable])
        : category === "diets"
        ? setProducts([...products, ...prods.data.diets])
        : setProducts([...products, ...prods.data.posts]);
      console.log(products, prods);
      setLoading(false);
    } catch (error) {
      console.log("ini error: ", error.response);
    }
  };
  return (
    <div className={styles.Container}>
      <div className={styles.Button}>
        <button
          className={category === "all" && styles.Active}
          onClick={() => setCat("all")}
          id="button"
        >
          All
        </button>
        <button
          className={category === "fruits" && styles.Active}
          onClick={() => setCat("fruits")}
          id="button"
        >
          Fruits
        </button>
        <button
          className={category === "vegetables" && styles.Active}
          onClick={() => setCat("vegetables")}
          id="button"
        >
          Vegetables
        </button>
        <button
          className={category === "diets" && styles.Active}
          onClick={() => setCat("diets")}
          id="button"
        >
          Diet
        </button>
      </div>
      <div className={styles.ContainerProduct}>
        <Product
          category={category}
          loading={loading}
          products={products}
          page={page}
          totalPage={totalPage}
          getMore={getMore}
        />
      </div>
    </div>
  );
}

export default Body;
