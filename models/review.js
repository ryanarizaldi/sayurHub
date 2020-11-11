const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema(
    {
        rating: {
            type: Number,
            require: true
        },
        review: {
            type: String,
            require: true
        },
        
        rating: {
            type : Number,
            required: true,
            min:1,
            max:5            
        },

        product: { type: Schema.Types.ObjectId, ref: "Product", default: null },
        user: { type: Schema.Types.ObjectId, ref: "User", default: null },

    },        
    {
        timestamps: true
    }
)

const review = mongoose.model("Review", reviewSchema);

exports.Review = review;
