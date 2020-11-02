import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import styles from './SellerProduct.module.css';
import Product from './Product';
import * as actionTypes from '../../redux/action/Action';
import SkeletonSell from '../skeletons/SkeletonSell';


function SellerProduct(props) {
	
    const { getProductById, productData, trigger } = props;
	
	useEffect(() => {
		getProductById()
	}, [getProductById, trigger])
	
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
