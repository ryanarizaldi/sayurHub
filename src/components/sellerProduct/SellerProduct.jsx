import React from 'react';
import styles from './SellerProduct.module.css';
import banana from '../../assets/img/banana.png';
import grape from '../../assets/img/prod_grapes.png';
import lemon from '../../assets/img/prod_lemon.png';
import cabbage from '../../assets/img/prod_cabbage.png';
import tomato from '../../assets/img/prod_tomato.png';


export default function SellerProduct(props) {
	
	const {onChange} = props;
	
    return (
        <div className={styles.Products}>
            <div className={styles.CardProduct}>
                <img src={banana} alt="seller product"/>
                <p>Banana</p>
                <span>Rp 12.000,-</span>
                <div className={styles.CardButton}>
                    <button onClick={onChange}>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className={styles.CardProduct}>
                <img src={banana} alt="seller product"/>
                <p>Banana Qu</p>
                <span>Rp 1.000,-</span>
                <div className={styles.CardButton}>
                    <button onClick={onChange}>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className={styles.CardProduct}>
                <img src={banana} alt="seller product"/>
                <p>Banana KW</p>
                <span>Rp 99.000,-</span>
                <div className={styles.CardButton}>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className={styles.CardProduct}>
                <img src={tomato} alt="seller product"/>
                <p>Cute Tomato</p>
                <span>Rp 12.000,-</span>
                <div className={styles.CardButton}>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className={styles.CardProduct}>
                <img src={cabbage} alt="seller product"/>
                <p>Kol Kayaknya</p>
                <span>Rp 12.000,-</span>
                <div className={styles.CardButton}>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className={styles.CardProduct}>
                <img src={grape} alt="seller product"/>
                <p>Amer</p>
                <span>Rp 75.000,-</span>
                <div className={styles.CardButton}>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className={styles.CardProduct}>
                <img src={lemon} alt="seller product"/>
                <p>Nutrisari</p>
                <span>Rp 12.000,-</span>
                <div className={styles.CardButton}>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    )
}
