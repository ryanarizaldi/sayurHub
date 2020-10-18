import React, {useState, useRef} from 'react';
import { Link } from "react-router-dom";
import styles from './Login.module.css';
import logo from '../../assets/img/logo.svg';
import shoping from '../../assets/img/shoping.svg';
import axios from 'axios';
import qs from 'qs';
import Swal from 'sweetalert2';


export default function Login() {
    
    const  [dataLogin, setData] = useState([]);
    const inputEmail = useRef();
    const inputPassword = useRef();

    const login = async(e) => {
        e.preventDefault();
        console.log("emailnya; ", inputEmail.current.value);
        console.log("passwordnya; ", inputPassword.current.value);
        try {
            const dataLogin = qs.stringify({
                email: inputEmail.current.value,
                password: inputPassword.current.value
              });
            const post = await axios({
                method: "post",
                url: "https://pacific-oasis-23064.herokuapp.com/user/login",
                data: dataLogin,
                headers: {
                "content-Type": "application/x-www-form-urlencoded",
                },
            })
            console.log(post.data);
            Swal.fire({
                position: 'top-mid',
                icon: 'success',
                title: `Login Success, Welcome`,
                showConfirmButton: false,
                timer: 1500
              })
        } catch (error) {
            console.log("error", error.response);
            Swal.fire({
                title: "Login Failed",
                text: error.response.data.message,
                icon: "error",
              });
        }
    }


    return (
        <div>
            <div className={styles.Logo}>
                <img src={logo} alt="logo"></img>
            </div>

            <div className={styles.Row}>
                
                <div className={styles.Image}>
                    <img src={shoping} alt="logo"></img>
                </div>
 
                <div className={styles.FormLogin}>
                    <h4>Sign In</h4>
                    <form onSubmit={login}>
                        <label for="email">Email</label>
                        <input type="email" name="email" placeholder="enter your email" ref={inputEmail}></input>
                        <label for="Password">Password</label>
                        <input type="Password" name="Password" placeholder="enter your Password " ref={inputPassword}></input>
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
