const productRepo = require("../repositories/product.repository");
const reviewRepo = require("../repositories/review.repository");
const {mapReviewWithUsers, destructureIds} = require("../utils/common.util")
const {createIndex, updateIndex, deleteIndex} = require("../utils/algolia/algolia");
const {GET_SUCCESS,GET_FAILED,POST_SUCCESS,POST_FAILED,DELETE_SUCCESS,DELETE_FAILED,
    UPDATE_SUCCESS,UPDATE_FAILED,SCHEMA_PRODUCT,SCHEMA_REVIEW, SCHEMA_SERVICE,SCHEMA_SALON
} = require("../constants/constant")

const getProductData = async () => {
    console.log("calledd product service")
    try {
        const response = await productRepo.getProductData();

        if (response) {
            return {status: 1, message: GET_SUCCESS, response};
        } else { 
            return {status: 0, message: GET_FAILED };
        }
    } catch (err) {
        console.log(err)
    }
}

/* 
    Map the product along with reviews and map the reviews with user details
    Also fetch the recommended products 

*/
const getProductByID = async params => { 
    try {
        const response = await productRepo.getProductByID(params);
        let reviewIds = await destructureIds(response,SCHEMA_REVIEW)
        let reviewResponse = []
        if(reviewIds.length > 0){
            reviewResponse = await reviewRepo.getReviewsByIds(reviewIds);
            reviewResponse = await mapReviewWithUsers(reviewResponse);
        }
        let recommendationIds = await destructureIds(response,SCHEMA_PRODUCT)
        let recommendationResponse = []
        if(recommendationIds.length > 0){
            recommendationResponse = await productRepo.getProductByIds(recommendationIds);
        }

        if (response) {
            return { status: 1, message: GET_SUCCESS, product:response, reviews: reviewResponse, recommendations:recommendationResponse};
        } else {
            return { status: 0, message: GET_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

/* 
    @createIndex Methods  - Save the data in algolia index

*/
const createProductData = async params => {
    console.log("calledd product service");
    try {
        const response = await productRepo.createProductData(params);
        console.log("response", response);
        if (response) {
            createIndex(params, response, "Product");
            return { status: 1, message: POST_SUCCESS, data: response };
        } else {
            return { status: 0, message: POST_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

/* 
    @updateIndex Methods  - update the data in algolia index

*/
const updateProductData = async params => {
    console.log("calledd product service");
    try {
        const response = await productRepo.updateProductData(params);
        console.log("response", response);
        if (response) {
            updateIndex(response, "Product");
            return { status: 1, message: UPDATE_SUCCESS, data: response };
        } else {
            return { status: 0, message: UPDATE_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

/* 
    @deleteIndex Methods  - Delete the data from algolia index

*/
const deleteProductData = async params => {
    console.log("calledd product service");
    try {
        const response = await productRepo.deleteProductData(params);
        console.log("deleteres", response);
        if (response) {
            deleteIndex(response, "Product");
            return { status: 1, message: DELETE_SUCCESS, data: response };
        } else {
            return { status: 0, message: DELETE_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getProductData,
    getProductByID,
    createProductData,
    updateProductData,
    deleteProductData,
};