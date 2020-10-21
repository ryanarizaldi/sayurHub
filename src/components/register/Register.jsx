import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import styles from './Register.module.css';
import logo from '../../assets/img/logo.svg';
import shoping from '../../assets/img/shoping.svg';
import axios from 'axios';
import qs from 'qs';
import Swal from 'sweetalert2';

export default function Register() {

    const fullnameVal = useRef(),
          emailVal = useRef(),
          passVal = useRef();

    const registering = async (e) => {
        e.preventDefault();
        console.log(fullnameVal.current.value, emailVal.current.value, passVal.current.value);
        
        const body = qs.stringify({
            full_name: fullnameVal.current.value,
            email: emailVal.current.value,
            password: passVal.current.value
        })
        try {
            const reg = await axios({
                method: "post",
                url: "https://pacific-oasis-23064.herokuapp.com/user/register",
                data: body,
                headers: {
                "content-Type": "application/x-www-form-urlencoded",
                },
            });
            console.log(reg.data);
            Swal.fire({
                position: 'top-mid',
                icon: 'success',
                title: `Register Success, Please Login first!`,
                showConfirmButton: false,
                timer: 1500
              });
        } catch (error) {
            Swal.fire({
                title: "register Failed",
                text: error.response.data.message,
                icon: "error",
              });
        }
    }

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
                    <form onSubmit={registering}>
                        <label for="Fullname">Fullname</label>
                        <input type="text" name="Fullname" placeholder="Enter Your Fullname" ref={fullnameVal}></input>
                        <label for="email">Email</label>
                        <input type="email" name="email" placeholder="Enter Your email" ref={emailVal}></input>
                        <label for="Password">Password</label>
                        <input type="Password" name="Password" placeholder="Enter Your Password" ref={passVal}></input>
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
