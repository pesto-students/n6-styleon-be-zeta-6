const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
// const { checkToken } = require("../../../utils/jwt");


router.get('/', userController.getUserByID);
router.post('/create', userController.saveUser);
router.put("/update", userController.updateUser);
router.delete("/delete", userController.deleteUser);


module.exports = router; 
