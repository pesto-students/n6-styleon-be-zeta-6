const reviewServices = require('../../services/review.service');
// const { checkToken } = require("../../../utils/jwt");

const getReviews = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await reviewServices.getReviews({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

const createReview = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await reviewServices.createReview({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

const updateReview = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await reviewServices.updateReview({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

const deleteReview = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await reviewServices.deleteReview({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

module.exports = {
    getReviews,
    createReview,
    updateReview,
    deleteReview
}