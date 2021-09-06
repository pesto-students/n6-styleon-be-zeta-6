const productServices = require('../../services/product.service');
// const { checkToken } = require("../../../utils/jwt");

const getProductData = async (req,res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await productServices.getProductData({
        ...params,
        ...queryParams,
        ...bodyParams
    });
    return res.status(200).send(response);
}

const getProductByID = async (req, res) => {
    console.log("called");

    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await productServices.getProductByID({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

const createProductData = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await productServices.createProductData({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

const updateProductData = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await productServices.updateProductData({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

const deleteProductData = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await productServices.deleteProductData({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

module.exports = {
    getProductData,
    getProductByID,
    createProductData,
    updateProductData,
    deleteProductData,
};
