import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../redux/action/Action";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import styles from "./Review.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import ModalEdit from "./ModalEditReview";
import SkeletonReview from "../skeletons/SkeletonReview";

function Review(props) {
  const { review, getReview, loading, user } = props;

  // const [reviews, setReview] = useState([]);
  const [modal, setModal] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getReview(id);
  }, [id, getReview]);

  const alertRemove = (id) => {
    Swal.fire({
      title: `Delete this review?`,
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReview(id);
      }
    });
  };

  const deleteReview = async (id) => {
    try {
      const deleting = await axios({
        method: "delete",
        url: `https://pacific-oasis-23064.herokuapp.com/reviews/delete/${id}`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      getReview(id);
      Swal.fire("Deleted!", `${deleting.data.message}`, "success");
    } catch (error) {}
  };

  return (
    // <div className={styles.Container}>
    <div className={styles.Review}>
      {review.length || !loading ? (
        review.map((rev) => (
          <div className={styles.UserReview} key={rev._id}>
            <div className={styles.UserPicture}>
              <img src={rev.user.profile_image} alt="user profile" />
            </div>
            <div className={styles.Column}>
              <div className={styles.NameRate}>
                <p>{rev.user.full_name}</p>
                <ReactStars value={rev.rating} edit={false} size={36} />
              </div>
              <div className={styles.Comment}>
                <p>{rev.review}</p>
                {rev.user._id === user._id ? (
                  <div className={styles.ButtonGroup}>
                    <div className={styles.EditButton}>
                      <button onClick={() => setModal(true)}>Edit</button>
                      {modal && (
                        <ModalEdit
                          open={modal}
                          onClose={() => setModal(false)}
                          review={rev}
                        />
                      )}
                    </div>
                    <div className={styles.DeleteButton}>
                      <button onClick={() => alertRemove(rev._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))
      ) : (
        <SkeletonReview />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    review: state.index.review,
    user: state.index.userData,
    loading: state.index.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReview: (id) => dispatch(actionTypes.getReview(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
