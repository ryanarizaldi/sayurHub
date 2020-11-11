const express = require("express");
const router = express.Router();
const { Authentication } = require('../middlewares/auth');

const reviewControllers = require("../controllers/review");

router.post("/create/:product_id", Authentication, reviewControllers.CreateReview); // Create : membuat review
router.get("/", reviewControllers.GetReviews); // Read : menampilkan seluruh review
router.put("/update/:id", Authentication, reviewControllers.Edit); // Update : update review
router.delete("/delete/:id", Authentication, reviewControllers.Delete); // Delete : menghapus review
router.get("/product/:product_id", reviewControllers.GetReviewByProduct); // Read : menampilkan review per product
router.get('/rating/:product_id', reviewControllers.getRating); // Read : menampilkan rating product yang direview

module.exports = router;
