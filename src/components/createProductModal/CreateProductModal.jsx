import React, { useState } from "react";
import styles from "./CreateProductModal.module.css";
import { Modal } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

function CreateProductModal(props) {
  const { open, onClose } = props;

  const [image, setImage] = useState({});
  const [loginGa, setToken] = useState(localStorage.getItem("token"));

  const schema = Yup.object().shape({
    productName: Yup.string().required("Product Name is required"),
    description: Yup.string().required("Description is required"),
    discount: Yup.number()
      .integer("Description must be a round number")
      //   .max(1, "kebanyakan")
      //   .moreThan(0, "must be bigger than 0!")
      .lessThan(100, "You must be drunkif its true!"),
    //   .required("Description is required"),
    category: Yup.string().required("Choose one!"),
    price: Yup.number()
      .integer("Price must be a round number!")
      .required("Type the price!")
      .moreThan(99, "Must be bigger than 100!"),
    stock: Yup.number()
      .integer("Stock must be a round number!")
      .required("Type the price!")
      .moreThan(4, "Minimum stock is 5"),
    weight: Yup.number()
      .moreThan(0, "minimum weight is 1")
      .integer("Weight must be a round number!")
      .required("Type the price!"),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      category: "",
      discount: 0,
      price: 0,
      stock: 0,
      weight: 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      createProds(values);
    },
  });

  const handleFileUpload = (event) => {
    const file = event.currentTarget.files[0];
    setImage({
      file: event.currentTarget.files[0],
      url: URL.createObjectURL(file),
    });
  };

  const createProds = async (values) => {
    console.log("masuk sini");
    try {
      const {
        productName,
        description,
        category,
        discount,
        price,
        stock,
        weight,
      } = values;
      const formData = new FormData();
      formData.append("product_name", productName);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("discount", discount);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("weight", weight);
      formData.append("product_image", image.file);

      console.log(formData);
      const makeProd = await axios({
        method: "post",
        url: `https://pacific-oasis-23064.herokuapp.com/products/create`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: loginGa,
        },
      });
      onClose();
      Swal.fire({
        position: "top-mid",
        icon: "success",
        title: `Success Add Products!`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(makeProd);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={onClose} className={styles.Modal}>
        <div className={styles.ContainerModal}>
          <h1>Create Product</h1>
          <h2 onClick={onClose}></h2>
          <form className={styles.Form} onSubmit={formik.handleSubmit}>
            {image.url && (
              <div className={styles.PreviewUpload}>
                <img src={image.url} alt="Preview" />
              </div>
            )}
            <label className={styles.UploadImage}>
              <input type="file" onChange={(e) => handleFileUpload(e)} />
              UPLOAD IMAGE
            </label>
            <label className={styles.Label} htmlFor="productName">
              Product Name
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="productName"
              name="productName"
              placeholder=""
              className={
                formik.touched.productName && formik.errors.productName
                  ? styles.ErrorInput
                  : null
              }
            ></input>
            {formik.touched.productName && formik.errors.productName ? (
              <div className={styles.ErrorMsg}>{formik.errors.productName}</div>
            ) : null}
            <label htmlFor="description" className={styles.Label}>
              Description
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="description"
              name="description"
              placeholder=""
              className={
                formik.touched.description && formik.errors.description
                  ? styles.ErrorInput
                  : null
              }
            ></input>
            {formik.touched.description && formik.errors.description ? (
              <div className={styles.ErrorMsg}>{formik.errors.description}</div>
            ) : null}
            <label htmlFor="discount" className={styles.Label}>
              Discount
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              id="discount"
              name="discount"
              placeholder=""
              className={
                formik.touched.discount && formik.errors.discount
                  ? styles.ErrorInput
                  : null
              }
            ></input>
            {formik.touched.discount && formik.errors.discount ? (
              <div className={styles.ErrorMsg}>{formik.errors.discount}</div>
            ) : null}
            <label className={styles.Label} htmlFor="category">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option disabled></option>
              <option value="Fruit">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Diet">Diet</option>
            </select>
            <label htmlFor="price" className={styles.Label}>
              Price
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              name="price"
              id="price"
              className={
                formik.touched.price && formik.errors.price
                  ? styles.ErrorInput
                  : null
              }
            ></input>
            {formik.touched.price && formik.errors.price ? (
              <div className={styles.ErrorMsg}>{formik.errors.price}</div>
            ) : null}
            <label htmlFor="stock" className={styles.Label}>
              Stock
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="stock"
              id="stock"
              className={
                formik.touched.stock && formik.errors.stock
                  ? styles.ErrorInput
                  : null
              }
            ></input>
            {formik.touched.stock && formik.errors.stock ? (
              <div className={styles.ErrorMsg}>{formik.errors.stock}</div>
            ) : null}
            <label htmlFor="weight" className={styles.Label}>
              Weight
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="weight"
              id="weight"
              className={
                formik.touched.weight && formik.errors.weight
                  ? styles.ErrorInput
                  : null
              }
            ></input>
            {formik.touched.weight && formik.errors.weight ? (
              <div className={styles.ErrorMsg}>{formik.errors.weight}</div>
            ) : null}
            <button type="submit">CREATE</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default CreateProductModal;
