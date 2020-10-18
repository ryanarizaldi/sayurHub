import React from 'react';
import { Link } from "react-router-dom";
import styles from './Register.module.css';
import logo from '../../assets/img/logo.svg';
import shoping from '../../assets/img/shoping.svg';

export default function Register() {
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
                    <h4>Sign Up</h4>
                    <form>
                        <label for="Fullname">Fullname</label>
                        <input type="text" name="Fullname" placeholder="Enter Your Fullname"></input>
                        <label for="email">Email</label>
                        <input type="email" name="email" placeholder="Enter Your email"></input>
                        <label for="Password">Password</label>
                        <input type="Password" name="Password" placeholder="Enter Your Password"></input>
                        <label for="confirmpass">Confirm Password</label>
                        <input type="Password" name="confirmpass" placeholder="Type Your Password Again"></input>
                        <button type="submit">Sign In</button>
                        <p>Already have an account? <Link to="/login">Sign In</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}
