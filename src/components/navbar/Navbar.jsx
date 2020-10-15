import React from 'react';
import { Navbar, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../assets/img/logo.svg";
import search from "../../assets/img/search.png";
import styles from './Navbar.module.css';


export default function Nav() {
    return (
        <Navbar  className={styles.Nav}>
        <Navbar.Brand href="#home">
          <img src={logo}
           height="38"
           width="81"/>
            </Navbar.Brand>
                <div className={styles.Searchlogo}>
                <img src={search} 
                height="20"
                width="20"/> 
                </div>
                <Form.Control className={styles.Form} type="text" placeholder="Search Product ..." />
                <Button className={styles.Button}>Sign Up</Button>
                <a className={styles.Login} href="">Log In</a>
              
            </Navbar>
            
                
    )
}



