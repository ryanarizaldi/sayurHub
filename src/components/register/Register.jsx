import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import logo from "../../assets/img/logo.svg";
import shoping from "../../assets/img/shoping.svg";
import axios from "axios";
import qs from "qs";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";

export default function Register() {
  const [isSuccess, setSuccess] = useState(false);

  const schema = Yup.object().shape({
    fullname: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters at minimum")
      .required("Password is required"),
    confirmpass: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("You forgot to type this field"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmpass: "",
      fullname: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      registering(values);
    },
  });

  const registering = async (values) => {
    console.log("hello");
    const { email, password, fullname } = values;
    const body = qs.stringify({
      full_name: fullname,
      email: email,
      password: password,
    });
    try {
      const reg = await axios({
        method: "post",
        url: "https://pacific-oasis-23064.herokuapp.com/user/register",
        data: body,
        headers: {
          "content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log(reg.data);
      Swal.fire({
        position: "top-mid",
        icon: "success",
        title: `Register Success, Please Login first!`,
        showConfirmButton: false,
        timer: 1500,
      });

      setSuccess(true);
    } catch (error) {
      Swal.fire({
        title: "Register Failed",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  return (
    <div>
      {isSuccess && <Redirect push to="/login" />}
      <div className={styles.Logo}>
        <Link to="/">
          <img src={logo} alt="logo"></img>
        </Link>
      </div>

      <div className={styles.Row}>
        <div className={styles.Image}>
          <img src={shoping} alt="logo"></img>
        </div>

        <div className={styles.FormLogin}>
          <h4>Sign Up</h4>
          <form onSubmit={formik.handleSubmit} noValidate>
            <label htmlFor="fullname">Fullname</label>
            <input
              className={
                formik.touched.fullname && formik.errors.fullname
                  ? styles.ErrorInput
                  : ""
              }
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Enter Your Fullname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.touched.fullname && formik.errors.fullname ? (
              <div className={styles.ErrorMsg}>{formik.errors.fullname}</div>
            ) : null}

            <label htmlFor="email">Email</label>
            <input
              className={
                formik.touched.email && formik.errors.email
                  ? styles.ErrorInput
                  : ""
              }
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.ErrorMsg}>{formik.errors.email}</div>
            ) : null}

            <label htmlFor="password">Password</label>
            <input
              className={
                formik.touched.password && formik.errors.password
                  ? styles.ErrorInput
                  : ""
              }
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.ErrorMsg}>{formik.errors.password}</div>
            ) : null}

            <label htmlFor="confirmpass">Confirm Password</label>
            <input
              className={
                formik.touched.confirmpass && formik.errors.confirmpass
                  ? styles.ErrorInput
                  : ""
              }
              type="Password"
              name="confirmpass"
              id="confirmpass"
              placeholder="Type Your Password Again"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.touched.confirmpass && formik.errors.confirmpass ? (
              <div className={styles.ErrorMsg}>{formik.errors.confirmpass}</div>
            ) : null}

            <button type="submit">
              {formik.isSubmitting ? "PLEASE WAIT..." : "SUBMIT"}
            </button>
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
