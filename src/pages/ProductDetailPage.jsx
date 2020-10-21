import React from 'react';
import Product from '../components/productdetail/ProductDets'
import Review from '../components/review/Review'
import styles from './Bg.module.css'

export default function ProductDetailPage() {
    return (
        <div className={styles.Wrapper}>
            <Product />
            <Review />
        </div>
    )
}
