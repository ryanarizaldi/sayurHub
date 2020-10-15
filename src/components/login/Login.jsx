import React from 'react';
import styles from './Login.module.css';
import logo from '../../assets/img/logo.svg';
import shoping from '../../assets/img/shoping.svg';


export default function Login() {
    return (
        <div>
            <div className={styles.Logo}>
                <img src={logo}></img>
            </div>

            <div  className={styles.Row}>
                <div className={styles.Image}>
                    <img src={shoping}></img>
                </div>

                <div className={styles.FormLogin}>
                    <h3>Sign Up</h3>
                    
                            <label>Email</label>
                            <input></input>
                            <label>Password</label>
                            <input></input>
                            <button>SIGN IN</button>
                   
                        <p>Don't have an Account? <a>Sign Up</a></p>
                </div>

            </div>
        </div>
    )
}
