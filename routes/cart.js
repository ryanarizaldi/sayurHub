const express = require("express");
const router = express.Router();
const { Authentication } = require('../middlewares/auth');

const cartControllers = require("../controllers/cart");

router.post("/add/:product_id", Authentication, cartControllers.addToCart);
router.get("/list", cartControllers.getCart)
router.delete("/empty/:id", cartControllers.emptyCart);
router.delete("/delete/:id/:productId", cartControllers.deleteProductCart)

module.exports = router;
