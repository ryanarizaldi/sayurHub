import React from 'react';
import { Modal } from "@material-ui/core";
import styles from './ModalEditUser.module.css';
import robert from '../../assets/img/robert.png'

function ModalEditUser(props) {

    const {open, onClose} = props;
    return (
        <Modal open={open} onClose={onClose}>
            <div className={styles.EditUser}>
                <div className={styles.Header}>
                    <h1>Edit User</h1>
                    <button onClick={onClose}>X</button>
                </div>
                <form>
                    <img src={robert} alt=""/>
                    <label for="profile_picture" className={styles.CustomUpload}>
                        Upload Image
                    </label>
                    <input type="file" size="60" name="profile_picture" id="profile_picture"></input>
                    <label for="fullname">Full Name</label>
                    <input type="text" name="fullname" placeholder="Enter Your Fullname"></input>
                    <label for="email">Email</label>
                    <input type="text" name="email" placeholder="Enter Your Email Address"></input>
                    <label for="Description">Description</label>
                    <input type="text" name="Description" placeholder="Tell us a bit about yourself"></input>
                    <div className={styles.ButtonGroup}>
                        <button className={styles.Cancel}>Cancel</button>
                        <button className={styles.Submit}>Save Changes</button>
                    </div>
                </form>
            </div>
		</Modal>
    )
}

export default ModalEditUser;