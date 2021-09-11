const userRepo = require("../repositories/user.repository");
const {decodeToken} = require("../utils/firebase/firebase.util")
const { GET_SUCCESS,GET_FAILED,POST_SUCCESS,POST_FAILED,DELETE_SUCCESS,DELETE_FAILED,UPDATE_FAILED,UPDATE_SUCCESS,
} = require("../constants/constant");
const {sendWelcomeEmail} = require("../utils/sendGrid/sendGrid");
 
const getUserByID = async (params) => {
    console.log("calledd user service");
    try {
        const response = await userRepo.getUserByID(params);
        // console.log(response)
        if (response) {
            return { status: 1, message: GET_SUCCESS, response };
        } else {
            return { status: 0, message: GET_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

const saveUser = async (params) => {
    try {
        const existingUser = await userRepo.getUserByEmail(params)
        if(existingUser.length >=1){ 
            console.log("user present")
            return { status: 1, message: POST_SUCCESS, response: existingUser };
        }else{
            console.log("params", params)
            const response = await userRepo.saveUser(params);
            sendWelcomeEmail(params.email, params.name)
            if (response) {
                return { status: 1, message: POST_SUCCESS, response };
            } else { 
                return { status: 0, message: POST_FAILED };
            }
        } 
    } catch (err) {
        console.log(err);
    }
};

const updateUser = async (params) => {
    console.log("calledd product service");
    try {
        const response = await userRepo.updateUser(params);
        if (response) {
            return { status: 1, message: UPDATE_SUCCESS, response };
        } else {
            return { status: 0, message: UPDATE_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

const deleteUser = async (params) => {
    console.log("calledd product service");
    try {
        const response = await userRepo.deleteUser(params);
        console.log("deleteres", response);
        if (response) {
            return { status: 1, message: DELETE_SUCCESS, response };
        } else {
            return { status: 0, message: DELETE_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getUserByID,
    saveUser,
    updateUser,
    deleteUser,
};