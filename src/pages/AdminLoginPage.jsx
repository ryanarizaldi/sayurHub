import React from "react";
import Login from "../components/login/AdminLogin";
import styles from "./Bg.module.css";

export default function LoginPage() {
  return (
    <div className={styles.Wrapper}>
      <Login />
    </div>
  );
}
