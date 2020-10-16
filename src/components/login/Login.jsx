import React from 'react';
import { Link } from "react-router-dom";
import styles from './Login.module.css';
import logo from '../../assets/img/logo.svg';
import shoping from '../../assets/img/shoping.svg';


export default function Login() {
    return (
        <div>
            <div className={styles.Logo}>
                <img src={logo}></img>
            </div>

            <div className={styles.Row}>
                
                <div className={styles.Image}>
                    <img src={shoping}></img>
                </div>

                <div className={styles.FormLogin}>
                    <h4>Sign In</h4>
                    <form>
                        <label for="email">Email</label>
                        <input type="email" name="email" placeholder="enter your email"></input>
                        <label for="Password">Password</label>
                        <input type="Password" name="Password" placeholder="enter your Password"></input>
                        <button type="submit">Sign In</button>
                        <p>Dont have an account? <Link to="/register">Sign Up</Link></p>
                    </form>
                </div>
            </div>

            {/* <div  className={styles.Row}>
                <div className={styles.Image}>
                    <img src={shoping}></img>
                </div>

                <div className={styles.FormLogin}>
                    <h4>Sign Up</h4>
                    <form >
                        <label for="email">Email</label>
                        <input type="email" name="email"></input>
                        <label for="email">Password</label>
                        <input type="password" name="password"></input>
                        <button type="submit">SIGN IN</button>
                   </form> 
                    <p>Don't have an Account? <a>Sign Up</a></p>
                </div>

            </div> */}
        </div>
    )
}
