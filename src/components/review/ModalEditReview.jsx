import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import styles from "./ModalEditReview.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import qs from "qs";
import Swal from "sweetalert2";
import ReactStars from "react-stars";

export default function ModalEditReview(props) {
  const { open, onClose, reviews } = props;
  const [inputRate, setRate] = useState(reviews.rating);
  const schema = Yup.object().shape({
    review: Yup.string().required("This collom is required"),
    // rate: Yup.number().moreThan(0, "Fill the star to rate!"),
  });

  const formik = useFormik({
    initialValues: {
      review: reviews.review,
      rate: 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      editReview(values);
    },
  });

  const editReview = async (values) => {
    try {
      const { review } = values;
      const body = qs.stringify({
        review: review,
        rating: inputRate,
      });
      const put = await Axios({
        method: "PUT",
        url: `https://pacific-oasis-23064.herokuapp.com/reviews/update/${reviews._id}`,
        data: body,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: localStorage.getItem("token"),
        },
      });
      console.log(put.data);
      onClose();
      Swal.fire({
        position: "top-right",
        icon: "success",
        title: `Review Updated!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "something went wrong",
      });
    }
  };
  const changeRate = (value) => {
    setRate(value);
  };

  const alertClose = () => {
    Swal.fire({
      title: `Are you sure to cancel?`,
      text: "All your changes will be gone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, im sure!",
      customClass: {
        container: "myswal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onClose();
      }
    });
  };
  return (
    <Modal open={open} onClose={alertClose}>
      <div className={styles.ModalReview}>
        <div className={styles.Header}>
          <h1>Edit Review</h1>
          <button onClick={alertClose}>X</button>
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
            ) : null} */}
          <label for="review">Edit your Comment</label>
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
            value={formik.values.review}
          />
          {formik.touched.review && formik.errors.review ? (
            <div className={styles.ErrorMsg}>{formik.errors.review}</div>
          ) : null}
          <div className={styles.ButtonGroup}>
            <button className={styles.Cancel} onClick={alertClose} type="reset">
              Cancel
            </button>
            <button className={styles.Submit} type="submit">
              {formik.isSubmitting ? "submitting..." : "Submit Change"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
