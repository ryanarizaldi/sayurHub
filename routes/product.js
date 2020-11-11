const express = require('express');
const router = express.Router();

const productController = require("../controllers/product");

router.get('/', productController.GetAll)
// router.get('/seller/:id', productController.GetDetailSeller)
// router.get("/user", Authentication, productController.GetProductbyUser)
router.post('/find/:product', productController.Search)
router.get('/:id', productController.GetProductId)
router.get('/filter/vegetables', productController.FilterVegetable)
router.get('/filter/fruits', productController.FilterFruits)
router.get('/filter/diets', productController.FilterDiet)


module.exports = router;
