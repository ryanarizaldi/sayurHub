import React, {useState} from 'react';
import styles from './UserDashboard.module.css';
import robert from '../../assets/img/robert.png';
import ReactStars from 'react-stars';
import Products from '../sellerProduct/SellerProduct';
import Notification from '../notification/Notification';
import History from '../history/UserHistory';
import {NavLink, Route} from 'react-router-dom';
import ModalEdit from './ModalEditUser';


export default function UserDashboard() {

    const [modal, setModal] = useState(false);

    const openModal = (isOpen) => {
        setModal(isOpen);
    }

    return (
        <div className={styles.Wrapper}>
            <div className={styles.UserCard}>
                <img src={robert} alt="user profile"/>
                <p>Robert E.O Speedwagon</p>
                <ReactStars value={5} edit={false} size={20}/>
                <button onClick={() => openModal(true)}>Edit Profile</button>
                {modal && <ModalEdit open={modal} onChange={openModal} onClose={() => openModal(false)} />}
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
