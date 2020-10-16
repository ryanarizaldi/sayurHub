import React from 'react';
import ReactStars from 'react-stars';
import styles from './Review.module.css';
import robert from '../../assets/img/robert.png'
import karen from '../../assets/img/karen.png'

export default function Review() {
    return (
        <div className={styles.Review}>
            <h4>Reviews</h4>
            <div className={styles.UserReview}>
                <img src={robert} alt="user profile"/>
                <div className={styles.Column}>
                    <div className={styles.NameRate}>
                        <p>Robert</p>
                        <ReactStars value={5} edit={false} size={36}/>
                    </div>
                    <div className={styles.Comment}>
                        <p>I have never taste something so delicious like this before!</p>
                    </div>
                </div>
            </div>
            <div className={styles.UserReview}>
                <img src={karen} alt="user profile"/>
                <div className={styles.Column}>
                    <div className={styles.NameRate}>
                        <p>Karen</p>
                        <ReactStars value={4} edit={false} size={36}/>
                    </div>
                    <div className={styles.Comment}>
                       Superb!
                    </div>
                </div>
            </div>
        </div>
    )
}
