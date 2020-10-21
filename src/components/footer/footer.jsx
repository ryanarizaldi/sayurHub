import React from 'react'
import styles from './footer.module.css'

export default function footer() {
    return (
        <div className={styles.BackgroundFooter}>
            <hr className={styles.LineSayur}></hr>
            <p className={styles.FooterSayur}>2020, SayurHub</p>
        </div>
    )
}
