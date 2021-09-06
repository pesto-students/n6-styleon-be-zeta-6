const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');
// const { checkToken } = require("../../../utils/jwt");


router.get("/", homeController.getHomeData);

module.exports = router;
