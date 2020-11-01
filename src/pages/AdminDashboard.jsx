import React from "react";
import AdminDashboard from "../components/adminDashboard/AdminDashboard";
import styles from "./Bg.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.Wrapper}>
      <AdminDashboard />
    </div>
  );
}
