const { User } = require ('../models/user');
const { Product } = require ('../models/product');
const { Review } = require ('../models/review');

exports.CreateReview = async (req, res, next) => {
  try {
    // input container
    let obj = {};
    const userID = req.userData;
    const productID = req.params.product_id;
    const { rating, review } = req.body;

    if (rating) obj.rating = rating;
    if (review) obj.review = review;
    if (userID) obj.user = userID;
    if (productID) obj.product = productID;

    const foundUser = await Review.findOne({ user: userID});
    const foundProduct = await Review.findOne({ product: productID});

    if(!(foundUser && foundProduct)) {
      let reviews = await Review.create(obj);    
        await User.findByIdAndUpdate(userID, {
          $push: { review: review._id },
        });
        await Product.findByIdAndUpdate(productID, {
          $push: { review: review._id },
        });

        res.status(201).json({
          success: true,
          message: "Successfully create a review!",
          data: reviews,
        });
    } else {
      res.status(409).json({
        success: false,
        message: "You have reviewed this product before!"
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.GetReviews = async (req, res, next) => {
  try {
    let reviews = await Review.find()
    res.status(200).json({
    success: true,
    message: "Successfully retrieve the data!",
    data: reviews,
    });
  } catch (err) {
    next(err);
  }
};  

exports.GetReviewByProduct = async (req, res, next) => {  
  let obj = {};
  const productID = req.params.product_id;
  if (productID) obj.product = productID;
  try{
      const foundReview = await Review.find({product : productID})
      if (foundReview){
          res.status(200).json({
            success: true,
            message: "Successfully retrieve the data!",
            data: foundReview
          })
      } else {
          res.send(404).json({
          msg: "there is no review found in this product"
          })
      }
  } catch(err){
      next(err);
  }
}

exports.getRating = async (req, res, next) => {
  const productID = req.params.product_id;
  // const userID = req.userData;    
  let obj = {};
  if (productID) obj.product = productID;
  // if (userID) obj.user = userID;
  try{
      const rating = await Review.find({ product:productID })
      let temp = 0;
      rating.forEach(el => {
      temp += el.rating
      });
      const rate = temp/rating.length
      res.status(200).json({
          average_rating : Math.round(rate),
          total_reviewer : rating.length,
          product : productID
      })
  } catch(err){
      next(err)
  }
}



exports.Edit = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next({ message: "Missing ID Params" });

    const updatedData = await Review.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully update a review!",
      data: updatedData,
    });
  } catch (err) {
    next(err);
  }
};

exports.Delete = async (req, res, next) => {
  const id = req.params.id;  
    try {
          await Review.findByIdAndRemove(id, (err, doc, result)=>{
            if (err) throw "Failed to delete";
            if (!doc) return res.status(400).json({ success: false, err: "Data not found!" });                    
              res.status(200).json({
                success: true,
                message: "Successfully deleted data!",
                data: doc,
              });    
          })                  
        }      
    catch(err) {
        next(err);
    }
}
