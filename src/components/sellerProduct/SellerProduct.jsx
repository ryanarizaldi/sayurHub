import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import styles from './SellerProduct.module.css';
import Product from './Product';
import Swal from 'sweetalert2';
import * as actionTypes from '../../redux/action/Action';


function SellerProduct(props) {
	
    const { getProductById, productData, trigger } = props;
	
	useEffect(() => {
		getProductById()
	}, [getProductById, trigger])
    
    const removeProduct = (item) => {
        Swal.fire({
            title: `Delete ${item}?`,
            text: "This action cannot be undone",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                `${item} has been deleted.`,
                'success'
              )
            }
          })
    }
	
    return (
        <div className={styles.Products}>
			{productData?.length > 0
			 ? productData.map((list) => {
				return (
				<Product 
					key={list._id}
					list={list}
					removeProduct={removeProduct}/>
			)
			})
			: "Product is not available"}
        </div>
    )
}


const mapStateToProps = state => {
	return{
		productData: state.productData,
		trigger: state.trigger
	}
}

const mapDispatchToProps = dispatch => {
	return{
		getProductById: () => dispatch(actionTypes.getProductById())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerProduct);
