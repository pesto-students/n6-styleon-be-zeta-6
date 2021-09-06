const salonRepo = require("../repositories/salon.repository");
const reviewRepo = require("../repositories/review.repository");
const groomingServiceRepo = require("../repositories/groomingServices.repository");
const {createIndex, updateIndex, deleteIndex} = require("../utils/algolia/algolia");
const {mapReviewWithUsers, destructureIds} = require("../utils/common.util")
const {GET_SUCCESS,GET_FAILED,POST_SUCCESS,POST_FAILED,DELETE_SUCCESS,DELETE_FAILED,
    UPDATE_SUCCESS,UPDATE_FAILED,SCHEMA_PRODUCT,SCHEMA_REVIEW, SCHEMA_SERVICE,SCHEMA_SALON
} = require("../constants/constant")


const getSalonData = async () => {
    console.log("calledd Salon service")
    try {
        const response = await salonRepo.getSalonData();
        if (response) {
            return {status: 1, message: GET_SUCCESS, response};
        } else {
            return {status: 0, message: GET_FAILED };
        }
    } catch (err) {
        console.log(err)
    }
}

const getSalonByID = async (params) => {
    try {
        const response = await salonRepo.getSalonByID(params);
        console.log("response salonRepo", response);
        let reviewIds = await destructureIds(response,SCHEMA_REVIEW)
        let reviewResponse = []

        console.log("reviewid service", reviewIds)
        
        if(reviewIds.length > 0){
            reviewResponse = await reviewRepo.getReviewsByIds(reviewIds);
            reviewResponse = await mapReviewWithUsers(reviewResponse);
        }
        let recommendationIds = await destructureIds(response,SCHEMA_SALON)
        let recommendationResponse = []
        if(recommendationIds.length > 0){
            recommendationResponse = await groomingServiceRepo.getGroomingServiceByIDs(recommendationIds);
        }

        if (response) {
            return {
                status: 1,
                message: GET_SUCCESS,
                salon: response,
                reviews: reviewResponse,
                recommendations: recommendationResponse,
            };
        } else {
            return { status: 0, message: GET_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
}
/* 
    @createIndex Methods  - Save the data in algolia index

*/
const createSalonData = async (params) => {
    console.log("calledd Salon service")
    try {
        const response = await salonRepo.createSalonData(params);
        console.log("response",response)
        if (response) {
            createIndex(params,response,"Salon");
            return {status: 1, message: POST_SUCCESS, data:response};
        } else {
            return {status: 0, message: POST_FAILED };
        }
    } catch (err) {
        console.log(err)
    }
}

/* 
    @updateIndex Methods  - update the data in algolia index

*/
const updateSalonData = async (params) => {
    console.log("calledd Salon service")
    try {
        const response = await salonRepo.updateSalonData(params);
        console.log("response", response)
        if (response) {
            updateIndex(response,"Salon");
            return {status: 1, message: UPDATE_SUCCESS, data:response};
        } else {
            return {status: 0, message: UPDATE_FAILED};
        }
    } catch (err) {
        console.log(err)
    }
}

/* 
    @deleteIndex Methods  - Delete the data from algolia index

*/
const deleteSalonData = async (params) => {
    console.log("calledd Salon service")
    try {
        const response = await salonRepo.deleteSalonData(params);
        console.log("deleteres", response);
        if (response) {
            deleteIndex(response,"Salon");
            return {status: 1, message: DELETE_SUCCESS, data:response};
        } else {
            return {status: 0, message: DELETE_FAILED};
        }
    } catch (err) {
        console.log(err)
    } 
}


module.exports = {
    getSalonData,
    createSalonData,
    updateSalonData,
    deleteSalonData,
    getSalonByID
} 