import React from 'react';
import styles from './SellerProduct.module.css';
import banana from '../../assets/img/banana.png';
import grape from '../../assets/img/prod_grapes.png';
import lemon from '../../assets/img/prod_lemon.png';
import cabbage from '../../assets/img/prod_cabbage.png';
import tomato from '../../assets/img/prod_tomato.png';
import Swal from 'sweetalert2';


export default function SellerProduct(props) {
	
    const {onChange} = props;
    
    const removeProduct = (item) => {
        Swal.fire({
            title: `Delete ${item}?`,
            text: "This action cannot be undone",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                `${item} has been deleted.`,
                'success'
              )
            }
          })
    }
	
    return (
        <div className={styles.Products}>
            <div className={styles.CardProduct}>
                <img src={banana} alt="seller product"/>
                <p>Banana</p>
                <span>Rp 12.000,-</span>
                <div className={styles.CardButton}>
                    <button onClick={onChange}>Edit</button>
                    <button onClick={() => removeProduct('Banana')}>Delete</button>
                </div>
            </div>
            <div className={styles.CardProduct}>
                <img src={banana} alt="seller product"/>
                <p>Banana Qu</p>
                <span>Rp 1.000,-</span>
                <div className={styles.CardButton}>
                    <button onClick={onChange}>Edit</button>
                    <button onClick={() => removeProduct('Banana')}>Delete</button>
                </div>
            </div>
            <div className={styles.CardProduct}>
                <img src={banana} alt="seller product"/>
                <p>Banana KW</p>
                <span>Rp 99.000,-</span>
                <div className={styles.CardButton}>
                    <button>Edit</button>
                    <button onClick={() => removeProduct('Banana')}>Delete</button>
                </div>
            </div>
            <div className={styles.CardProduct}>
                <img src={tomato} alt="seller product"/>
                <p>Cute Tomato</p>
                <span>Rp 12.000,-</span>
                <div className={styles.CardButton}>
                    <button>Edit</button>
                    <button onClick={() => removeProduct('Banana')}>Delete</button>
                </div>
            </div>
            <div className={styles.CardProduct}>
                <img src={cabbage} alt="seller product"/>
                <p>Kol Kayaknya</p>
                <span>Rp 12.000,-</span>
                <div className={styles.CardButton}>
                    <button>Edit</button>
                    <button onClick={() => removeProduct('Banana')}>Delete</button>
                </div>
            </div>
            <div className={styles.CardProduct}>
                <img src={grape} alt="seller product"/>
                <p>Amer</p>
                <span>Rp 75.000,-</span>
                <div className={styles.CardButton}>
                    <button>Edit</button>
                    <button onClick={() => removeProduct('Banana')}>Delete</button>
                </div>
            </div>
            <div className={styles.CardProduct}>
                <img src={lemon} alt="seller product"/>
                <p>Nutrisari</p>
                <span>Rp 12.000,-</span>
                <div className={styles.CardButton}>
                    <button>Edit</button>
                    <button onClick={() => removeProduct('Banana')}>Delete</button>
                </div>
            </div>
        </div>
    )
}
