const orderModel = require("../models/order.model")

const getCardById = async (params) => {
    try {
        const snapshot = await orderModel.where("uid", "==", parseInt(params.uid))
        .where("Payment_status", "==", "failed")
        .get();
        let cartData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        return cartData;
    } catch (e) {
        console.log(e);
    }
}

const createCart = async (params) => {
    try {
        return await orderModel.add(params)
    } catch (e) {
        console.log(e);
    }
}

const updateCart = async (params) => {
    console.log("updatecartData params", params)
    let cart;
    try{
        await orderModel.where('uid','==', params.uid)
        .where("Payment_status", "==", "failed")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc=> {
                doc.ref.update(params)
                cart =  {...doc.data(), ...params, id:doc.id}
            });
        })        
        .catch(err => {
            console.log(err)
        })
    }catch (e) { 
        console.log(e);
    }
    return cart;
}

const deleteCart = async (params) => {
    let order
    try{
        await orderModel.where('uid','==', params.uid)
        .where("Payment_status", "==", "failed")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc=> {
                doc.ref.delete()
                order = doc.id
            });
        })
        .catch(err => {
            console.log(err)
        })
    }catch (e) {
        console.log(e);
    }
    return order;
}


module.exports = {
    getCardById,
    createCart,
    updateCart,
    deleteCart
}


// Demo Json 
// {
// 	"order_id": 8,
// 	"uid": 7,
// 	"services": [{
// 		"service_id": 2,
// 		"slot_details": {
// 			"time": 1629661642,
// 			"type": "home service"
// 		},
// 		"price": 750
// 	}],
// 	"products": [{
// 		"product_id": 15,
// 		"price": 1200
// 	}],
// 	"timestamp": 1629661642,
// 	"Payment_status": "failed"
// }

