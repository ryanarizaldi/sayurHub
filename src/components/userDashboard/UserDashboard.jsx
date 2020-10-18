import React, {useState} from 'react';
import styles from './UserDashboard.module.css';
import robert from '../../assets/img/robert.png';
import ReactStars from 'react-stars';
import Products from '../sellerProduct/SellerProduct';
import Notification from '../notification/Notification';
import History from '../history/UserHistory';
import CreateProductModal from '../createProductModal/CreateProductModal';
import EditProductModal from '../editProductModal/EditProductModal';
import {NavLink, Route} from 'react-router-dom';


export default function UserDashboard() {
	
	const [modal, setModal] = useState({
			  createProduct: false,
			  editProduct: false,
			  deleteProduct: false
		  })
	
	const onChange = ( name, value ) => {
    	setModal({ 
			[name] : value
		})
		console.log("modal is" + modal);
  	}
	
	const {createProduct, editProduct, deleteProduct} = modal;
	
	let modale = "";
	
	if(createProduct){
		 modale = <CreateProductModal
            open={createProduct}
            onChange={onChange}
            onClose={() => onChange("createProduct", false)}
          />
	 } else if(editProduct){
		 modale = <EditProductModal
			open={editProduct}
            onChange={onChange}
            onClose={() => onChange("createProduct", false)}
		  />
	 }
	
	
    return (
        <div className={styles.Wrapper}>
            <div className={styles.UserCard}>
                <img src={robert} alt="user profile"/>
                <p>Robert E.O Speedwagon</p>
                <ReactStars value={5} edit={false} size={20}/>
                <button>Edit Profile</button>
				<button 
					className={styles.CreateButton}
					onClick={() => onChange("createProduct", true)}>Create Product</button>
            </div>

            <div className={styles.DashboardCard}>
                <NavLink to="/dashboard/products" activeClassName={styles.Active}>Products</NavLink>
                <NavLink to="/dashboard/history" activeClassName={styles.Active}>Transaction History</NavLink>
                <NavLink to="/dashboard/notification" activeClassName={styles.Active}>Notification</NavLink>
                <button 
					className={styles.CreateButton}
					onClick={() => onChange("createProduct", true)}>Create Product</button>

                <Route path="/dashboard/products">
                    <Products onChange={() => onChange("editProduct", true)}/>
                </Route>
                <Route path="/dashboard/history">
                    <History />
                </Route>
                <Route path="/dashboard/notification">
                    <Notification />
                </ Route>

                
            </div>
			{modale}
        </div>
    )
}
