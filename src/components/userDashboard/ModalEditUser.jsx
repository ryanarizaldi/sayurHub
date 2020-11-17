import React, { useState } from "react";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { Modal } from "@material-ui/core";
import styles from "./ModalEditUser.module.css";
import { useFormik } from "formik";
import * as actionTypes from "../../redux/action/Action";
import * as Yup from "yup";

const schemaEdit = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  full_name: Yup.string()
    .min(5, "Password must be 5 characters at minimum")
    .required("Fullname is required"),
  description: Yup.string()
    .min(5, "Password must be 5 characters at minimum")
    .required("Description is required"),
});

function ModalEditUser(props) {
  const { open, onClose, userData, editUser, loading } = props;

  const [profile_image, setProfile_image] = useState({
    file: {},
    url: userData.profile_image,
  });

  const changePic = (e) => {
    const file = e.currentTarget.files[0];
    setProfile_image({
      file: e.currentTarget.files[0],
      url: URL.createObjectURL(file),
    });
  };

  const formik = useFormik({
    initialValues: {
      full_name: userData.full_name,
      email: userData.email,
      description: userData.description,
    },
    onSubmit: (values) => {
      editUser(values, userData._id, profile_image.file, onClose);
    },
    validationSchema: schemaEdit,
  });

  return (
    <Modal open={open} onClose={onClose} className={styles.Modal}>
      <div className={styles.EditUser}>
        <div className={styles.Header}>
          <h1>Edit User</h1>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form className={styles.Form} onSubmit={formik.handleSubmit}>
          <img src={profile_image.url} alt={userData.full_name} />
          <label htmlFor="profile_image" className={styles.CustomUpload}>
            Upload Image
          </label>
          <input
            type="file"
            size="60"
            name="profile_image"
            id="profile_image"
            onChange={(e) => changePic(e)}
          ></input>
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            value={formik.values.full_name}
            id="full_name"
            name="full_name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={
              formik.touched.full_name && formik.errors.full_name
                ? styles.ErrorInput
                : null
            }
          ></input>
          {formik.touched.full_name && formik.errors.full_name ? (
            <div className={styles.ErrorMsg}>{formik.errors.full_name}</div>
          ) : null}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={formik.values.email}
            type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={
              formik.touched.email && formik.errors.email
                ? styles.ErrorInput
                : null
            }
          ></input>
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.ErrorMsg}>{formik.errors.email}</div>
          ) : null}
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={formik.values.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={
              formik.touched.description && formik.errors.description
                ? styles.ErrorInput
                : null
            }
          ></input>
          {formik.touched.description && formik.errors.description ? (
            <div className={styles.ErrorMsg}>{formik.errors.description}</div>
          ) : null}
          <div className={styles.ButtonGroup}>
            <button className={styles.Cancel}>Cancel</button>
            {!loading ? (
              <button className={styles.Submit} type="submit">
                Save Changes
              </button>
            ) : (
              <button className={styles.Submit} type="submit">
                ...Please wait
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.index.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (values, id, state, onClose) =>
      dispatch(actionTypes.editUser(values, id, state, onClose)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
