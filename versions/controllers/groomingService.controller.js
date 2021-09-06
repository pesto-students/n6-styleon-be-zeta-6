const groomingServiceServices = require('../../services/groomingService.service');
// const { checkToken } = require("../../../utils/jwt");

const getGroomingServiceData = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await groomingServiceServices.getGroomingServiceData({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

const getAllServiceData = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await groomingServiceServices.getAllServiceData({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

const getGroomingServiceByID = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await groomingServiceServices.getGroomingServiceByID({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};



const createGroomingServiceData = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await groomingServiceServices.createGroomingServiceData({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

const updateGroomingServiceData = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await groomingServiceServices.updateGroomingServiceData({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

const deleteGroomingServiceData = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await groomingServiceServices.deleteGroomingServiceData({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

module.exports = {
    getGroomingServiceData,
    createGroomingServiceData,
    updateGroomingServiceData,
    deleteGroomingServiceData,
    getAllServiceData,
    getGroomingServiceByID
};
