import React from 'react';
import styles from './UserDashboard.module.css';
import robert from '../../assets/img/robert.png';
import ReactStars from 'react-stars';
import Products from '../sellerProduct/SellerProduct';
import Notification from '../notification/Notification';
import History from '../history/UserHistory';
import {NavLink, Route} from 'react-router-dom';


export default function UserDashboard() {
    return (
        <div className={styles.Wrapper}>
            <div className={styles.UserCard}>
                <img src={robert} alt="user profile"/>
                <p>Robert E.O Speedwagon</p>
                <ReactStars value={5} edit={false} size={20}/>
                <button>Edit Profile</button>
            </div>

            <div className={styles.DashboardCard}>
                <NavLink to="/dashboard/products" activeClassName={styles.Active}>Products</NavLink>
                <NavLink to="/dashboard/history" activeClassName={styles.Active}>Transaction History</NavLink>
                <NavLink to="/dashboard/notification" activeClassName={styles.Active}>Notification</NavLink>
                <button>Create Product</button>

                <Route path="/dashboard/products">
                    <Products />
                </Route>
                <Route path="/dashboard/history">
                    <History />
                </Route>
                <Route path="/dashboard/notification">
                    <Notification />
                </ Route>

                
            </div>
        </div>
    )
}
