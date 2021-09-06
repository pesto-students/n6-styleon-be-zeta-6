const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { checkToken } = require("../../utils/firebase/firebase.util");

router.get("/",  cartController.getCardById);
router.post("/create",  cartController.createCart);
router.put("/update",  cartController.updateCart);

module.exports = router;
