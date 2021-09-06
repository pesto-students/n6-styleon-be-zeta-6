const express = require('express');
const homeServices = require('../../services/home.service');
// const { checkToken } = require("../../../utils/jwt");

const getHomeData = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await homeServices.getHomeData({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

module.exports = {
    getHomeData,
};
