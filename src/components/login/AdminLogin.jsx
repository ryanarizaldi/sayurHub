import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../../assets/img/logo.svg";
import shoping from "../../assets/img/shoping.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import * as actionTypes from "../../redux/action/Action";

function AdminLogin(props) {
  const { loginAdmin, isSuccess } = props;

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters at minimum")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      loginAdmin(values);
    },
  });

  return (
    <div>
      {isSuccess && <Redirect push to="/" />}
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
          <h4>Sign In For Admin</h4>
          <form onSubmit={formik.handleSubmit} noValidate>
            <label htmlFor="email">Email</label>
            <input
              className={
                formik.touched.email && formik.errors.email
                  ? styles.ErrorInput
                  : null
              }
              type="email"
              id="email"
              name="email"
              placeholder="enter your email"
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
                  : null
              }
              type="password"
              id="password"
              name="password"
              placeholder="enter your Password "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.ErrorMsg}>{formik.errors.password}</div>
            ) : null}
            <button type="submit">
              {formik.isSubmitting ? "Signing In..." : "Sign In"}
            </button>
            <p>
              Dont have an account? <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isSuccess: state.index.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAdmin: (values) => dispatch(actionTypes.loginAdmin(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
