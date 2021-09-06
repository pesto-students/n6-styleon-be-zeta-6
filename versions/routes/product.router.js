const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
// const { checkToken } = require("../../../utils/jwt");


router.get('/', productController.getProductData);
router.get("/id", productController.getProductByID);
router.post('/create', productController.createProductData);
router.put('/update', productController.updateProductData);
router.delete('/delete', productController.deleteProductData);

module.exports = router;
 