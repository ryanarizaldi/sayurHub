import React from 'react';
import UserDashboard from '../components/userDashboard/UserDashboard';
import styles from './Bg.module.css'


export default function DashboardPage() {
    return (
        <div className={styles.Wrapper}>
            <UserDashboard />
        </div>
    )
}
