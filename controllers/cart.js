const { Product } = require('../models/product');
const { Cart } = require('../models/cart');
const { User } = require('../models/user');

exports.addToCart = async(req, res, next) => {
    try {
        var productId = req.params.product_id;
        var userId = req.userData;
        var qty = req.body.qty;
        var qtytotal = 0
        Cart.findOne({ user: userId }, (err, doc) => {
            if (err) res.send(err);
            if (doc == null) {
                var cart = new Cart;
                Product.findById(productId, (err, product) => {
                    if (err) console.error(err);
                    let item = {
                        id: product._id,
                        name: product.product_name,
                        image:product.product_image,
                        price: product.price,
                        subtotal: product.price * 1,
                        quantity : parseInt(qty)
                    }
                    cart.items.push(item);
                    cart.user = userId; // set cart user
                    cart.totalPrice = item.price * item.quantity;
                    cart.totalQty =  item.quantity;
                    cart.save((err, data) => {
                        if (err) res.send(err);
                        res.json(cart);
                    });
                });
            } else {
                Product.findById(productId, (err, product) => {
                    let item = {
                        id: product._id,
                        name: product.product_name,
                        image: product.product_image,
                        price: product.price,
                        subtotal: product.price * 1,
                        quantity : parseInt(qty)
                    }
                    doc.items.push(item);
                    doc.save(err, data => {
                        res.json(doc);
                    })

                    doc.totalQty +=  item.quantity;
                    doc.totalPrice += item.price * item.quantity;
                })
            }
        })
    } catch (error) {
        next(error)
    }
}


exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.find()
        if (!cart) {
            return res.status(400).json({
                type: "Invalid",
                msg: "Cart not found",
            })
        }
        res.status(200).json({
            status: true,
            cart
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}

exports.emptyCart = async (req, res) => {
    try {
        const {id} = req.params;

        await Cart.findByIdAndRemove(id, (err, doc, result) => {
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
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}

exports.deleteProductCart = async (req, res) => {
    try {
        let product = Cart.update({'_id': req.params.id}, {$pull: {items : req.params.productId}});
        
        res.status(200).json({
            success: true,
            msg : "Successfully retrieve product data",
            product
        })
    }catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
};
