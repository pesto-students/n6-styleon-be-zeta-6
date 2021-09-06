const reviewRepo = require("../repositories/review.repository");
const {GET_SUCCESS,GET_FAILED,POST_SUCCESS,POST_FAILED,DELETE_SUCCESS,DELETE_FAILED,
    UPDATE_FAILED,
    UPDATE_SUCCESS
} = require("../constants/constant")

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
    console.log("calledd product service")
    try {
        const response = await reviewRepo.createReview(params);
        console.log("response",response)
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