import React from 'react';
<<<<<<< Updated upstream
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



=======
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
>>>>>>> Stashed changes
