import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/img/logo.svg';
import searchicon from '../../assets/img/searchicon.png';
export default function Navbar() {
    return (
        <div className={styles.Background}>
            <div className={styles.Container}>
                <div className={styles.Logo}>
                <img src={logo}></img>
                 </div>
                <div className={styles.Box}>
                <img src={searchicon}></img>
                </div>
                <div className={styles.Searchbox}>
                <input type="text" placeholder="Search Porduct..." name="search"></input>
                </div>
                <a href="/register" className={styles.Signup}>
                   <button>Sign Up</button> 
                </a>
                <a href="/login" className={styles.Login}>Log In</a>
                
            </div>
        </div>
        
       
    )
}
