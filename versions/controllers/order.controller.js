const orderServices = require('../../services/order.service');
// const { checkToken } = require("../../../utils/jwt");

const getOrderData = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await orderServices.getOrderData({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

const createOrderData = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await orderServices.createOrderData({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

const updateOrderData = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await orderServices.updateOrderData({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

const reschedule = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await orderServices.reschedule({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}


const deleteOrderData = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await orderServices.deleteOrderData({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

module.exports = {
    getOrderData,
    createOrderData,
    updateOrderData,
    deleteOrderData,
    reschedule
}
