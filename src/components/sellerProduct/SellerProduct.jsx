import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import styles from './SellerProduct.module.css';
import Product from './Product';
import * as actionTypes from '../../redux/action/Action';
import SkeletonSell from '../skeletons/SkeletonSell';
import Swal from "sweetalert2";
import Axios from "axios";


function SellerProduct(props) {
	
    const { getProductById, productData, trigger } = props;
	
	useEffect(() => {
		getProductById()
	}, [getProductById, trigger])
	
	const actualRemove = async (id) => {
    try {
      const remove = await Axios({
        method: "delete",
        url: `https://pacific-oasis-23064.herokuapp.com/admin/product/delete/${id}`,
        headers: {
          token: localStorage.getItem("tokenAdmin"),
       	 },
      });
      console.log("remove response", remove);
    } catch (error) {}
 };

  const removeProduct = (id) => {
    Swal.fire({
      title: `Delete this product?`,
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        actualRemove(id);
        getProductById();
        Swal.fire("Deleted!", `this product has been deleted.`, "success");
      }
    });
  };
	
	
    return (
        <div className={styles.Products}>
			{productData?.length > 0
			 ? productData.map((list) => {
				return (
				<Product 
					key={list._id}
					list={list}/>
			)
			})
			: [1,2,3,4,5,6,7,8].map((n) => <SkeletonSell key={n}/> )}
        </div>
    )
}


const mapStateToProps = state => {
	return{
		productData: state.index.productData,
		trigger: state.index.trigger
	}
}

const mapDispatchToProps = dispatch => {
	return{
		getProductById: () => dispatch(actionTypes.getProductById())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerProduct);
