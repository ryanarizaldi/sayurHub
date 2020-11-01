import React from 'react';
import BuyerUser from '../components/buyerUser/buyerUser';
import styles from './Bg.module.css'


export default function BuyerDashboard() {
    return (
        <div className={styles.Wrapper}>
            <BuyerUser />
        </div>
    )
}
