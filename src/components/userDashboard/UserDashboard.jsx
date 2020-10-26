import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'

import styles from './UserDashboard.module.css';
import robert from '../../assets/img/robert.png';
import ReactStars from 'react-stars';
import Products from '../sellerProduct/SellerProduct';
import Notification from '../notification/Notification';
import History from '../history/UserHistory';
import CreateProductModal from '../createProductModal/CreateProductModal';
import EditProductModal from '../editProductModal/EditProductModal';
import {NavLink, Route} from 'react-router-dom';
import ModalEdit from './ModalEditUser';
import * as actionTypes from '../../redux/action/Action';


function UserDashboard(props) {

	const { userData,getUser } = props;
	
	const [modal, setModal] = useState({
			  createProduct: false,
			  editProduct: false,
			  deleteProduct: false,
		      editProfile:false,
		  }),
		  [token, setToken] = useState(localStorage.getItem('token'));
	
	useEffect(() => {
		if(token){
			getUser()
		}
		
	}, [getUser, token])
	
	const onChange = ( name, value ) => {
		setToken(localStorage.getItem('token'));
    	setModal({ 
			[name] : value
		})
		console.log("modal is" + modal);
  	}
	
	const {createProduct, editProduct, deleteProduct, editProfile} = modal;
	
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
       <div className={styles.Container}>
      <div className={styles.Row}>
        <div className={styles.Wrapper}>
          <div className={styles.ColUser}>
            <div className={styles.UserCard}>
              <img src={userData.profile_image} alt="user profile" />
              <p>{userData.full_name}</p>
              <ReactStars value={5} edit={false} size={20} />
              <button onClick={() => onChange("editProfile", true)}>
                Edit Profile
              </button>
              {modal && (
                <ModalEdit
				  userData={userData}
                  open={editProfile}
                  onClose={() => onChange("editProfile", false)}
                />
              )}
              <button
                className={styles.CreateButton}
                onClick={() => onChange("createProduct", true)}
              >
                Create Product
              </button>
            </div>
          </div>
          <div className={styles.ColDasboard}>
            <div className={styles.DashboardCard}>
              <div className={styles.Navigation}>
                <NavLink
                  to="/dashboard/products"
                  activeClassName={styles.Active}
                >
                  Products
                </NavLink>
                <NavLink
                  to="/dashboard/history"
                  activeClassName={styles.Active}
                >
                  Transaction History
                </NavLink>
                <NavLink
                  to="/dashboard/notification"
                  activeClassName={styles.Active}
                >
                  Notification
                </NavLink>
                <button
                  className={styles.CreateButton}
                  onClick={() => onChange("createProduct", true)}
                >
                  Create Product
                </button>
              </div>

              <Route path="/dashboard/products">
                <Products onChange={() => onChange("editProduct", true)} />
              </Route>
              <Route path="/dashboard/history">
                <History />
              </Route>
              <Route path="/dashboard/notification">
                <Notification />
              </Route>
            </div>
          </div>
          {modale}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
	return{
		userData: state.userData
	}
}

const mapDispatchToProps = dispatch => {
	return{
		getUser: () => dispatch(actionTypes.getUser())
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);