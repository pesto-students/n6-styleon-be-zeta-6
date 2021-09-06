const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
// const { checkToken } = require("../../../utils/jwt");


router.get('/', bookingController.getbookingData);

module.exports = router;
