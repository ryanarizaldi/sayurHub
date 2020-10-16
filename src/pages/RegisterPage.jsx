import React from 'react';
import Register from '../components/register/Register';
import styles from './Bg.module.css';

export default function RegisterPage() {
    return (
        <div className={styles.Wrapper}>
            <Register />
        </div>
    )
}
