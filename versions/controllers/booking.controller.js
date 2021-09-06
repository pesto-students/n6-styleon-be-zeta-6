const express = require('express');
const bookingServices = require('../../services/booking.service');
// const { checkToken } = require("../../../utils/jwt");

const getbookingData = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await bookingServices.getbookingData({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

module.exports = {
    getbookingData
}
