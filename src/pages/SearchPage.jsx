import React from "react";
import styles from "./Bg.module.css";
import Search from "../components/search/Search";

export default function SearchPage() {
  return (
    <div className={styles.Wrapper}>
      <Search />
    </div>
  );
}
