const userServices = require('../../services/user.service');
// const { checkToken } = require("../../../utils/jwt");

const getUserByID = async (req, res) => {
    const params = req.params;
    console.log("params", params);
    const queryParams = req.query;
    console.log("queryParams", queryParams);
    const bodyParams = req.body;
    console.log("bodyParams", bodyParams);
    const response = await userServices.getUserByID({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

const saveUser = async (req, res) => {
    console.log("save user controller");
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await userServices.saveUser({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

const updateUser = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await userServices.updateUser({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

const deleteUser = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await userServices.deleteUser({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

module.exports = {
    getUserByID,
    saveUser,
    updateUser,
    deleteUser,
};
