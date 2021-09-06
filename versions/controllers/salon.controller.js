const salonServices = require('../../services/salon.service');
// const { checkToken } = require("../../../utils/jwt");

const getSalonData = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await salonServices.getSalonData({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}


const getSalonByID = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await salonServices.getSalonByID({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

const createSalonData = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await salonServices.createSalonData({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

const updateSalonData = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await salonServices.updateSalonData({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

const deleteSalonData = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await salonServices.deleteSalonData({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

module.exports = {
    getSalonData,
    createSalonData,
    updateSalonData,
    deleteSalonData,
    getSalonByID
}
