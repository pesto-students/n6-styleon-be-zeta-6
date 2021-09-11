const reviewRepo = require("../repositories/review.repository");
const {GET_SUCCESS,GET_FAILED,POST_SUCCESS,POST_FAILED,DELETE_SUCCESS,DELETE_FAILED,
    UPDATE_FAILED,
    UPDATE_SUCCESS
} = require("../constants/constant")
const globalRepo = require("../repositories/global.repository");
const productRepo = require("../repositories/product.repository");
const groomingServiceRepo = require("../repositories/groomingServices.repository");

const getReviews = async () => {
    console.log("calledd product service")
    try {
        const response = await reviewRepo.getReviews();
        if (response) {
            return {status: 1, message: GET_SUCCESS, response};
        } else {
            return {status: 0, message: GET_FAILED };
        }
    } catch (err) {
        console.log(err)
    }
}

const createReview = async (params) => {
    try {
        let review_id = await globalRepo.getReviewID()
       
        params.review_id = review_id;
        console.log("params", params)
        let id;
        if(params.product_or_service.service_id !== undefined)  {
            let data = {
                service_id: params.product_or_service.service_id
            }
            let serviceData = await groomingServiceRepo.getGroomingServiceByID(data)
            serviceData[0].review_id.push(review_id)
            let serviceUpdated = await groomingServiceRepo.updateGroomingServiceData(serviceData[0])
        }

        if(params.product_or_service.product_id !== undefined){
            let data = {
                product_id: params.product_or_service.product_id
            } 
            let productData = await productRepo.getProductByID(data)
            productData[0].review_id.push(review_id)
            let productUpdated = await productRepo.updateProductData(productData[0])
        }

        
        const response = await reviewRepo.createReview(params);
        if (response) {
            return {status: 1, message: POST_SUCCESS, response};
        } else {
            return {status: 0, message: POST_FAILED };
        }
    } catch (err) {
        console.log(err)
    } 
}

const updateReview = async (params) => {
    console.log("calledd product service")
    try {
        const response = await reviewRepo.updateReview(params);
        if (response) {
            return {status: 1, message: UPDATE_SUCCESS, response};
        } else {
            return {status: 0, message: UPDATE_FAILED };
        }
    } catch (err) {
        console.log(err)
    }
}

const deleteReview = async (params) => {
    console.log("calledd product service")
    try {
        const response = await reviewRepo.deleteReview(params);
        console.log("deleteres", response);
        if (response) {
            return {status: 1, message: DELETE_SUCCESS, response};
        } else {
            return {status: 0, message: DELETE_FAILED};
        }
    } catch (err) {
        console.log(err)
    } 
}


module.exports = {
    getReviews,
    createReview,
    updateReview,
    deleteReview
}