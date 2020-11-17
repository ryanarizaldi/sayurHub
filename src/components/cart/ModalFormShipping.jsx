import React, { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import styles from "./ModalFormShipping.module.css";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import qs from "qs";
import Swal from "sweetalert2";

function ModalFormShipping(props) {
  const { open, onClose, idCart } = props;
  const history = useHistory();
  const [province, setProv] = useState([]),
    [city, setCity] = useState([]),
    [input, setInput] = useState({ state: "6" });

  useEffect(() => {
    const getOption = async () => {
      try {
        const optionProv = await Axios({
          method: "get",
          url: `https://pacific-oasis-23064.herokuapp.com/delivery/province`,
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        const optionCity = await Axios({
          method: "get",
          url: `https://pacific-oasis-23064.herokuapp.com/delivery/city`,
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        setProv(optionProv.data.data.rajaongkir.results);
        setCity(optionCity.data.data.rajaongkir.results);
      } catch (error) {
        console.log("error get city and province", error.response);
      }
    };

    getOption();
  }, [open]);

  const handleChange = (e) => {
    setInput({
      [e.target.name]: e.target.value,
    });
  };
  const postTransaction = async (values) => {
    console.log("inivalues", values);
    try {
      const { first_name, last_name, address, email, phone, city } = values;
      const shipping = await Axios({
        method: "POST",
        url: `https://pacific-oasis-23064.herokuapp.com/transaction/checkout`,
        data: qs.stringify({
          cart: idCart,
          first_name: first_name,
          last_name: last_name,
          address: address,
          email: email,
          phone: phone,
          city: city,
        }),
        headers: {
          "content-Type": "application/x-www-form-urlencoded",
          token: localStorage.getItem("token"),
        },
      });
      shipping.data.success
        ? Swal.fire("Success!", `Now pay!`, "success").then(() =>
            history.push("/checkout")
          )
        : Swal.fire("Something went wrong!", `Try Again later!`, "error");
    } catch (error) {
      console.log("error Send data shipping", error);
    }
  };

  const schema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    phone: Yup.number().required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      city: "",
      address: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      postTransaction(values);
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.ContainerModal}>
        <h2>Shipping</h2>
        <h1 onClick={onClose}>
          <CloseIcon />
        </h1>
        <form className={styles.Form} onSubmit={formik.handleSubmit} noValidate>
          <label className={styles.Label} htmlFor="first_name">
            First Name
          </label>
          <input
            name="first_name"
            id="first_name"
            type="text"
            className={
              formik.touched.first_name && formik.errors.first_name
                ? styles.ErrorInput
                : ""
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label className={styles.Label} htmlFor="last_name">
            Last Name
          </label>
          <input
            name="last_name"
            id="last_name"
            type="text"
            className={
              formik.touched.last_name && formik.errors.last_name
                ? styles.ErrorInput
                : ""
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className={styles.Row}>
            <label className={styles.Label} htmlFor="email">
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              className={
                formik.touched.email && formik.errors.email
                  ? styles.ErrorInput
                  : ""
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className={styles.Label} htmlFor="phone">
              Phone
            </label>
            <input
              name="phone"
              id="phone"
              type="number"
              className={
                formik.touched.phone && formik.errors.phone
                  ? styles.ErrorInput
                  : ""
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <label className={styles.Label} htmlFor="state">
            Province
          </label>
          <select name="state" id="state" onChange={handleChange}>
            <option disabled></option>
            {province
              .filter(
                (opt) =>
                  opt.province === "DKI Jakarta" ||
                  opt.province === "Jawa Barat"
              )
              .map((opt) => (
                <option key={opt.province_id} value={opt.province_id}>
                  {opt.province}
                </option>
              ))}
          </select>
          <label className={styles.Label} htmlFor="city">
            City
          </label>
          <select
            name="city"
            id="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option disabled></option>
            {input.state
              ? city
                  .filter((opt) => opt.province_id === input.state)
                  .map((opt) => (
                    <option key={opt.city_id} value={opt.city_id}>
                      {opt.city_name}
                    </option>
                  ))
              : city.map((opt) => (
                  <option key={opt.city_id} value={opt.city_id}>
                    {opt.city_name}
                  </option>
                ))}
          </select>
          <label className={styles.Label} htmlFor="address">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            className={
              formik.touched.address && formik.errors.address
                ? styles.ErrorInput
                : ""
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <div className={styles.ButtonGroup}>
            <button className={styles.CancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.SubmitBtn} type="submit">
              {formik.isSubmitting ? "Submitting..." : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
export default ModalFormShipping;
