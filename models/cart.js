const mongoose = require('mongoose');
const { Schema } = mongoose;

// sample user schema
var cartSchema = new Schema({

    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    totalQty: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    items: Array,
    user: { type: Schema.Types.ObjectId, ref: 'User' }



});
const cart = mongoose.model("Cart", cartSchema);

exports.Cart = cart;
