import React, { useState, useEffect, useCallback } from "react";
import styles from "./body.module.css";
import axios from "axios";
import Product from "./product";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

function Body() {
  const [category, setCat] = useState("all"),
    [products, setProducts] = useState([]),
    [loading, setLoading] = useState(false),
    [page, setPage] = useState(1),
    [totalPage, setTotal] = useState(0),
    [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 800) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 800) {
      setShowScroll(false);
    }
  };

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

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

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
  const scrollTop = () => {
    window.scrollTo({ top: 750, behavior: "smooth" });
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
      {showScroll && (
        <div className={styles.ScrollTop}>
          <button onClick={scrollTop}>
            <ArrowUpwardIcon fontSize={"large"} />
            {/* Back to Top */}
          </button>
        </div>
      )}
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
