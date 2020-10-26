import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import styles from "./Review.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import ModalEdit from "./ModalEditReview";

export default function Review() {
  const [reviews, setReview] = useState([]);
  const [logged, setLogged] = useState({});
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  // const isMaker = localStorage.getItem(t)
  useEffect(() => {
    getReview();
    getCurrent();
  }, []);

  useEffect(() => {
    getReview();
  }, [reviews]);

  const getCurrent = async () => {
    try {
      console.log("masuk getcurrent");
      const current = await axios({
        method: "get",
        url: `https://pacific-oasis-23064.herokuapp.com/user/id/`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setLogged(current.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReview = async () => {
    try {
      const review = await axios.get(
        `https://pacific-oasis-23064.herokuapp.com/reviews/product/${id}`
      );
      setReview(review.data.data);
    } catch (error) {
      console.log("error nih gan", error);
    }
  };

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
      Swal.fire("Deleted!", `${deleting.data.message}`, "success");
    } catch (error) {}
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Review}>
        <h4>Reviews</h4>
        {reviews.length
          ? reviews.map((rev) => (
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
                    {rev.user._id === logged._id ? (
                      <div className={styles.ButtonGroup}>
                        <div className={styles.EditButton}>
                          <button onClick={() => setModal(true)}>Edit</button>
                          {modal && (
                            <ModalEdit
                              open={modal}
                              onClose={() => setModal(false)}
                              reviews={rev}
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
          : "No review yet, Be the first to review!"}
        {/* <div className={styles.UserReview}>
          <div className={styles.UserPicture}>
            <img src={karen} alt="user profile" />
          </div>
          <div className={styles.Column}>
            <div className={styles.NameRate}>
              <p>Karen</p>
              <ReactStars value={4} edit={false} size={36} />
            </div>
            <div className={styles.Comment}>Superb!</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
