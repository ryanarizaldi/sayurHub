const { Product } = require ('../models/product');
const { Admin } = require('../models/admin');
const mongoose = require('mongoose');
// const { Schema } = mongoose;

exports.Create = async (req, res, next) => {
    try {
        let obj = {};
        const {
            product_name, 
            description, 
            category, 
            actualPrice, 
            price, 
            discount, 
            stock, 
            weight,
            nutrition,
            farmer_supllier,
            product_image} = req.body;
        const adminId = req.userData._id
        // console.log(userId)
        // let actualPrice = 0;

        //checking data input
        if(product_name) obj.product_name = product_name;
        if(description) obj.description = description;
        if(category) obj.category = category;
        if(discount) obj.discount = discount;
        if(price) obj.price = price;
        if(actualPrice) obj.actualPrice = parseFloat(price - ((discount * price)/100)); 
        if(stock) obj.stock = stock;
        if(weight) obj.weight = weight;
        if(nutrition) obj.nutrition = nutrition;
        if(farmer_supllier) obj.farmer_supllier = farmer_supllier;
        if(req.file && req.file.fieldname && req.file.path) obj.product_image = req.file.path;
        if(adminId) obj.admin = adminId;

        // let product = await Product.create(obj);

        let product = await Product.findOneAndUpdate({_id:mongoose.Types.ObjectId()}, obj, {
            new: true,
            upsert: true, // create the data if not exist
            runValidators: true,
            setDefaultsOnInsert: true, // set default value based on models
            populate: {path: "admin"}
        })

        res.status(201).json({
            success: true,
            msg: 'Product created!',
            product
        })
    } catch (err) {
        next(err)
    }
}

exports.GetAll = async (req, res, next) => {
    try {
        const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0
        let products = await Product.find({}, undefined, { skip, limit: 20 }).sort('product_name')
        res.status(200).json({
            success: true, 
            msg: "Succesfully retrieve all the products!",
            products
        })
    } catch (err) {
        next(err)
    }
}

exports.Update = async (req, res, next) => {
    try {
        const { id } = req.params;
        let obj = {};
        const {product_name, description, category, actualPrice, price, discount, stock, weight, product_image,nutrition,farmer_supllier} = req.body;

        //checking data input
        if(product_name) obj.product_name = product_name;
        if(description) obj.description = description;
        if(category) obj.category = category;
        if(discount) obj.discount = discount;
        if(price) obj.price = price;
        if(actualPrice) obj.actualPrice = parseFloat(price - ((discount * price)/100)); 
        if(stock) obj.stock = stock;
        if(weight) obj.weight = weight;
        if(nutrition) obj.nutrition = nutrition;
        if(farmer_supllier) obj.farmer_supllier = farmer_supllier;
        if(req.file && req.file.fieldname && req.file.path) obj.product_image = req.file.path;

        const updateProduct = await Product.findByIdAndUpdate(
            id,
            { $set: obj },
            { new: true }
        );
    
        // console.log(updateProduct);

        res.status(200).json({
            success: true,
            msg: "Product updated!",
            updateProduct
        });
    } catch (err) {
        next(err)
    }
}

exports.Delete = async (req, res, next) => {
    try {
        const {id} = req.params;

        await Product.findByIdAndRemove(id, (err, doc, result) => {
            if(err){
                throw "Failed to delete product"
            }
            if(!doc){
                res.status(404).json({
                    success: false,
                    msg: "Product not found"
                })
            }
            res.status(200).json({
                success: true,
                msg: "Product deleted!",
                doc
            });
        });        
    } catch (err) {
        next(err)
    }
}

exports.GetProductId = async (req, res, next) => {
	try {
	    const  {id}  = req.params;
	    let products = await Product.findById({_id: id})
	    res.status(200).json({
            success: true,
            msg: "Successfully retrieve product data",
		    products
	    });
	} catch (err) {
	  next(err);
	}
  };

exports.Search = async (req, res, next) => {
    try {
       const  {product}  = req.params
       let found = await Product.find(
           {"product_name" : {$regex:product} }
        )
        console.log(found)
       res.status(200).json({
           success: true,
           msg: "Successfully retrieve all the products that have same name.",
           found
       })

    } catch (err) {
        next(err)
    }
}

// exports.GetProductbyUser = async (req, res, next) => {
// 	try {
//         const userId = req.userData._id

// 	    let userProducts = await Product.find({
//             user: userId
//         });
//         console.log(userProducts)
        
// 	    res.status(200).json({
//             success: true,
//             msg: "Successfully retrieve product data",
// 		    userProducts
// 	    });
// 	} catch (err) {
// 	  next(err);
// 	}
//   };



// exports.GetDetailSeller = async (req, res, next) => {
// try{
//     const id = req.params.id
//     let seller = await Product.find({
//         user : id
//     });
//     console.log(seller)
    
//     res.status(200).json({
//         success: true,
//         msg: "Successfully retrieve product data",
//         seller
//     });
// } catch (err) {
//   next(err);
// }
// };

exports.FilterVegetable = async (req, res, next) => {
    try {
        const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0
        let vegetable = await Product.find({"category": /Vegetables/},undefined, { skip, limit: 20 }).sort('product_name');
        
        res.status(200).json({
            success: true,
            msg : "Successfully retrieve product data",
            vegetable
        })
    }catch (err) {
        next (err);

    }
};

exports.FilterFruits = async (req, res, next) => {
    try {
        const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0
        let fruits = await Product.find({"category": /Fruit/},undefined, { skip, limit: 20 }).sort('product_name');
        
        res.status(200).json({
            success: true,
            msg : "Successfully retrieve product data",
            fruits
        })
    }catch (err) {
        next (err);

    }
};
exports.FilterDiet = async (req, res, next) => {
    try {
        const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0
        let diet = await Product.find({"category": /Diet/},undefined, { skip, limit: 20 }).sort('product_name');
        
        res.status(200).json({
            success: true,
            msg : "Successfully retrieve product data",
            diet
        })
    }catch (err) {
        next (err);

    }
};



