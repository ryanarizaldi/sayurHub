import React from 'react';
import ReactStars from 'react-stars';
import styles from './ProductDets.module.css';
import banana from '../../assets/img/mybanana.png';
import seller from '../../assets/img/seller_photo.png';


export default function ProductDets() {
    return (
        <div className={styles.Container}>
            <div className={styles.CardDetail}>
                <img src={banana} alt="product photo"/>
                <div className={styles.Content}>
                    <h3>Premium Jumbo Banana</h3>
                    <div className={styles.Rate}>
                        <ReactStars value={5} size={24} color2={'#ffd700'} edit={false} />
                    </div>
                    <div className={styles.Price}>
                        <span>Rp 90.000 ,-</span>
                        <h5>Rp 45.000,-</h5>
                    </div>
                    <div className={styles.Quantity}>
                        <p>Quantity: </p>
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                    <div className={styles.Seller}>
                        <img src={seller} alt="seller photo"/>
                        <div className={styles.SellerInfo}>
                            <p>Banana Lovers</p>
                            <button>Seller Details</button>
                        </div>
                    </div>
                    <div className={styles.AddToCart}>
                        <button>Add to Cart</button>
                        <button>Add Review</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
