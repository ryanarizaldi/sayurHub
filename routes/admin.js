const express = require("express");
const router = express.Router();

const adminControllers = require("../controllers/admin");
const userControllers = require("../controllers/user");
const productController = require("../controllers/product");
const { IsAdmin } = require("../middlewares/auth");
const {uploader} = require("../middlewares/multer")

router.post("/login", adminControllers.Login);
router.get("/", IsAdmin, adminControllers.GetAdminId);
router.get("/data", IsAdmin, adminControllers.GetAdmin);



// routes User Admin
router.get("/user", IsAdmin, userControllers.GetUser);
router.delete("/user/delete/:id", IsAdmin, userControllers.Delete);



//routes product admin
router.post('/product/create', IsAdmin, uploader.single("product_image"), productController.Create)
router.put('/product/:id', IsAdmin, uploader.single("product_image"), productController.Update) 
router.delete('/product/delete/:id', IsAdmin, productController.Delete) 


module.exports = router;