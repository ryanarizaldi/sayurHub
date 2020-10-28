import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import styles from "./ModalAddReview.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import qs from "qs";
import Swal from "sweetalert2";
import ReactStars from "react-stars";

export default function ModalAddReview(props) {
  const { open, onClose, prod } = props;
  const [inputRate, setRate] = useState(1);
  const schema = Yup.object().shape({
    review: Yup.string().required("This collom is required"),
    // rate: Yup.number().moreThan(0, "Fill the star to rate!"),
  });

  const formik = useFormik({
    initialValues: {
      review: "",
      rate: 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      postReview(values);
    },
  });

  const postReview = async (values) => {
    try {
      const { review } = values;
      const body = qs.stringify({
        review: review,
        rating: inputRate,
      });
      const post = await Axios({
        method: "post",
        url: `https://pacific-oasis-23064.herokuapp.com/reviews/create/${prod}`,
        data: body,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: localStorage.getItem("token"),
        },
      });
      onClose();
      Swal.fire({
        position: "top-mid",
        icon: "success",
        title: `${post.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      onClose();
      Swal.fire({
        title: "Add Review Failed",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  const changeRate = (value) => {
    setRate(value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.ModalReview}>
        <div className={styles.Header}>
          <h1>Add Review</h1>
          <button onClick={onClose}>X</button>
        </div>
        <form className={styles.Form} onSubmit={formik.handleSubmit} noValidate>
          <label for="rate">Rating</label>
          <ReactStars
            count={5}
            size={34}
            color2={"#ffd700"}
            name="rate"
            onChange={changeRate}
            value={inputRate}
          />
          <input
            className={styles.HideMe}
            value={inputRate}
            // onChange={formik.handleChange}
            type="number"
            // name="rate"
          />
          {/* {formik.errors.rate ? (
            <div className={styles.ErrorMsg}>{formik.errors.rate}</div>
            asd
          ) : null} */}
          <label for="review">Add your Comment</label>
          <input
            className={
              formik.touched.review && formik.errors.review
                ? styles.ErrorInput
                : null
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="review"
            placeholder="Enter Your Fullname"
          />
          {formik.touched.review && formik.errors.review ? (
            <div className={styles.ErrorMsg}>{formik.errors.review}</div>
          ) : null}
          <div className={styles.ButtonGroup}>
            <button className={styles.Cancel} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.Submit} type="submit">
              {formik.isSubmitting ? "submitting..." : "Add Review"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
