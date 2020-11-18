import React, { useState } from "react";
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
  const [province] = useState([
      { province_id: "6", province: "DKI Jakarta" },
      { province_id: "9", province: "Jawa Barat" },
    ]),
    [city] = useState([
      {
        city_id: "151",
        province_id: "6",
        province: "DKI Jakarta",
        type: "Kota",
        city_name: "Jakarta Barat",
        postal_code: "11220",
      },
      {
        city_id: "152",
        province_id: "6",
        province: "DKI Jakarta",
        type: "Kota",
        city_name: "Jakarta Pusat",
        postal_code: "10540",
      },
      {
        city_id: "153",
        province_id: "6",
        province: "DKI Jakarta",
        type: "Kota",
        city_name: "Jakarta Selatan",
        postal_code: "12230",
      },
      {
        city_id: "154",
        province_id: "6",
        province: "DKI Jakarta",
        type: "Kota",
        city_name: "Jakarta Timur",
        postal_code: "13330",
      },
      {
        city_id: "155",
        province_id: "6",
        province: "DKI Jakarta",
        type: "Kota",
        city_name: "Jakarta Utara",
        postal_code: "14140",
      },
      {
        city_id: "22",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Bandung",
        postal_code: "40311",
      },
      {
        city_id: "23",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kota",
        city_name: "Bandung",
        postal_code: "40111",
      },
      {
        city_id: "24",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Bandung Barat",
        postal_code: "40721",
      },
      {
        city_id: "34",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kota",
        city_name: "Banjar",
        postal_code: "46311",
      },
      {
        city_id: "54",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Bekasi",
        postal_code: "17837",
      },
      {
        city_id: "55",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kota",
        city_name: "Bekasi",
        postal_code: "17121",
      },
      {
        city_id: "78",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Bogor",
        postal_code: "16911",
      },
      {
        city_id: "79",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kota",
        city_name: "Bogor",
        postal_code: "16119",
      },
      {
        city_id: "103",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Ciamis",
        postal_code: "46211",
      },
      {
        city_id: "104",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Cianjur",
        postal_code: "43217",
      },
      {
        city_id: "107",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kota",
        city_name: "Cimahi",
        postal_code: "40512",
      },
      {
        city_id: "108",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Cirebon",
        postal_code: "45611",
      },
      {
        city_id: "109",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kota",
        city_name: "Cirebon",
        postal_code: "45116",
      },
      {
        city_id: "115",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kota",
        city_name: "Depok",
        postal_code: "16416",
      },
      {
        city_id: "126",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Garut",
        postal_code: "44126",
      },
      {
        city_id: "149",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Indramayu",
        postal_code: "45214",
      },
      {
        city_id: "171",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Karawang",
        postal_code: "41311",
      },
      {
        city_id: "211",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Kuningan",
        postal_code: "45511",
      },
      {
        city_id: "252",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Majalengka",
        postal_code: "45412",
      },
      {
        city_id: "332",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Pangandaran",
        postal_code: "46511",
      },
      {
        city_id: "376",
        province_id: "9",
        province: "Jawa Barat",
        type: "Kabupaten",
        city_name: "Purwakarta",
        postal_code: "41119",
      },
    ]),
    [input, setInput] = useState({ state: "6" });

  // this function below is a previous func to get city and province from BE's API. But since theres some problem with the endpoint, we choose to make it static
  // useEffect(() => {
  //   const getOption = async () => {
  //     try {
  //       const optionProv = await Axios({
  //         method: "get",
  //         url: `https://pacific-oasis-23064.herokuapp.com/delivery/province`,
  //         headers: {
  //           token: localStorage.getItem("token"),
  //         },
  //       });
  //       const optionCity = await Axios({
  //         method: "get",
  //         url: `https://pacific-oasis-23064.herokuapp.com/delivery/city`,
  //         headers: {
  //           token: localStorage.getItem("token"),
  //         },
  //       });

  //       setProv(optionProv.data.data.rajaongkir.results);
  //       setCity(optionCity.data.data.rajaongkir.results);
  //     } catch (error) {
  //       console.log("error get city and province", error.response);
  //     }
  //   };

  //   getOption();
  // }, [open]);

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
              {formik.isSubmitting ? "wait..." : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
export default ModalFormShipping;
