const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
// const { checkToken } = require("../../../utils/jwt");


router.get('/', reviewController.getReviews);
router.post('/create', reviewController.createReview);
router.put('/update', reviewController.updateReview);
router.delete('/delete', reviewController.deleteReview);

module.exports = router;
