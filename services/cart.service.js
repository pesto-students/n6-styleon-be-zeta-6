const orderRepo = require("../repositories/order.repository");
const productRepo = require("../repositories/product.repository");
const userRepo = require("../repositories/user.repository");
const groomingServiceRepo = require("../repositories/groomingServices.repository");
const cartRepo = require("../repositories/cart.repository")
const {decodeToken} = require("../utils/firebase/firebase.util")

const {GET_SUCCESS,GET_FAILED,POST_SUCCESS,POST_FAILED,DELETE_SUCCESS,DELETE_FAILED,
    UPDATE_SUCCESS,UPDATE_FAILED,SCHEMA_PRODUCT,SCHEMA_REVIEW, SCHEMA_SERVICE,SCHEMA_SALON
} = require("../constants/constant")

/*
 params will have idtoken. decode the token structure
 params.uid: uid
*/
const getCardById = async params => {
    console.log("calledd cartttt service");
    // decodeToken(params)
    try {
        let cartResponse = await cartRepo.getCardById(params);
        let userResponse = await userRepo.getUserByID(params);

        if (cartResponse) {
            return { status: 1, message: GET_SUCCESS, orders: cartResponse, user: userResponse };
        } else {
            return { status: 0, message: GET_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

const createCart = async params => {
    console.log("calledd createCart service");
    console.log("params: " , params);
    try {
        const response = await cartRepo.createCart(params);
        console.log("response", response);
        if (response) {
            return { status: 1, message: POST_SUCCESS, data: response };
        } else {
            return { status: 0, message: POST_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

const updateCart = async params => {
    console.log("calledd Salon service");
    console.log("params: " , params);
    try {
        const response = await cartRepo.updateCart(params);
        console.log("response", response);
        if (response) {
            return { status: 1, message: UPDATE_SUCCESS, data: response };
        } else {
            return { status: 0, message: UPDATE_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

const deleteCart = async params => {
    console.log("calledd Salon service");
    try {
        const response = await cartRepo.deleteOrderData(params);
        console.log("deleteres", response);
        if (response) {
            return { status: 1, message: DELETE_SUCCESS, data: response };
        } else {
            return { status: 0, message: DELETE_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

//Map the order with services
const mapOrdersWithServicesAndProducts = async orders => {
    let serviceId = [];
    let productId = [];
    console.log("orders", orders);
    orders.map(order => {
        if (order.services !== undefined && order.services !== null)
            order.services.map(s => serviceId.push(s.service_id));

        if (order.products !== undefined && order.products !== null)
            order.products.map(p => productId.push(p.product_id));
    });
    let groomingResponse = await groomingServiceRepo.getGroomingServiceByIDs(serviceId);
    let productResponse = await productRepo.getProductByIds(productId);

    orders.map(order => {
        if (order.services !== undefined && order.services !== null) {
            order.services.map(s => {
                groomingResponse.map(gServices => {
                    if (gServices.service_id === s.service_id) {
                        s.service_name = gServices.name;
                        s.hero_image = gServices.hero_image;
                    }
                });
            });
        }

        if (order.products !== undefined && order.products !== null) {
            order.products.map(p => {
                productResponse.map(prod => {
                    if (prod.product_id === p.product_id) {
                        p.product_name = prod.product_name;
                        p.images = prod.images;
                    }
                });
            });
        }
    });
    return orders;
};


module.exports = {
    getCardById,
    createCart,
    updateCart,
    deleteCart
} 