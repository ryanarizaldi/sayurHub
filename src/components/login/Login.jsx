import React, {useState} from 'react';
import { Link } from "react-router-dom";
import styles from './Login.module.css';
import logo from '../../assets/img/logo.svg';
import shoping from '../../assets/img/shoping.svg';
import axios from 'axios';
import qs from 'qs';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Redirect} from 'react-router-dom';



export default function Login() {

    const [isSuccess, setSuccess] = useState(false);

    const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email address format")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be 8 characters at minimum")
          .required("Password is required")
      });

      const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: schema,
        onSubmit: values => {
          login(values)
        },
      });
    
    const login = async(values) => {
        const {email, password} = values;
        
        try {
            const dataLogin = qs.stringify({
                email: email,
                password: password
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
              });
              
              localStorage.setItem('token', post.data.token);
            setSuccess(true);

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
        {isSuccess && <Redirect push to="/" />}
            <div className={styles.Logo}>
                <img src={logo} alt="logo"></img>
            </div>

            <div className={styles.Row}>
                
                <div className={styles.Image}>
                    <img src={shoping} alt="logo"></img>
                </div>
 
                <div className={styles.FormLogin}>
                    <h4>Sign In</h4>
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="enter your email" onChange={formik.handleChange}></input>
                        {formik.touched.email && formik.errors.email ? (<div className={styles.ErrorMsg}>{formik.errors.email}</div>) : null}
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="enter your Password " onChange={formik.handleChange}></input>
                        {formik.touched.password && formik.errors.password ? (<div className={styles.ErrorMsg}>{formik.errors.password}</div>) : null}
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
