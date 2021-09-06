const cartServices = require('../../services/cart.service');
// const { checkToken } = require("../../../utils/jwt");

const getCardById = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await cartServices.getCardById({
        ...params,
        ...queryParams,
        ...bodyParams 
    });
    return res.status(200).send(response);
}

const createCart = async (req,res) => {

    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await cartServices.createCart({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

const updateCart = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await cartServices.updateCart({
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
    const response = await cartServices.deleteOrderData({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

module.exports = {
    getCardById,
    createCart,
    updateCart,
}
