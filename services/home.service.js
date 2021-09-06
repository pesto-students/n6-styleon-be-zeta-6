const homeRepo = require("../repositories/home.repository");
const productRepo = require("../repositories/product.repository");
const reviewRepo = require("../repositories/review.repository");
const userRepo = require("../repositories/user.repository");
const groomingServiceRepo = require("../repositories/groomingServices.repository");
const {mapReviewWithUsers} = require("../utils/common.util")
const { GET_SUCCESS, GET_FAILED, POST_SUCCESS, POST_FAILED } = require("../constants/constant");

const getHomeData = async params => {
    console.log("calledd home service");
    try {
        let groomingServiceResponse = await groomingServiceRepo.getGroomingServiceData();
        let productResponse = await productRepo.getProductData();
        let reviewResponse = await reviewRepo.getReviews();

        //Filter only the featured products/salons/reviews
        groomingServiceResponse = groomingServiceResponse.filter(service => service.featured);
        productResponse = productResponse.filter(product => product.featured);
        reviewResponse = reviewResponse.filter(review => review.featured);

        let testimonials = await mapReviewWithUsers(reviewResponse);

        if (groomingServiceResponse && productResponse && reviewResponse) {
            return {
                status: 1,
                message: GET_SUCCESS,
                groomingServices: groomingServiceResponse,
                products: productResponse,
                testimonials: testimonials,
            };
        } else {
            return { status: 0, message: GET_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getHomeData,
};