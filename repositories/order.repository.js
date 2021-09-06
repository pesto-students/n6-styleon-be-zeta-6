const orderModel = require("../models/order.model")

const getOrderData = async (params) => {
    try {
        const snapshot = await orderModel.where("uid", "==", parseInt(params.uid)).get();
        let orderData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        return orderData;
    } catch (e) {
        console.log(e);
    }
}

const createOrderData = async (params) => {
    try {
        return await orderModel.add(params)
    } catch (e) {
        console.log(e);
    }
}

const updateOrderData = async (params) => {
    console.log("updateOrderData params", params)
    let order;
    try{
        await orderModel.where('order_id','==', params.order_id)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc=> {
                doc.ref.update(params)
                order =  {...doc.data(), ...params, id:doc.id}
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

const reschedule = async (params) => {
    console.log("updateOrderData params", params)
    let order;
    try{
        await orderModel.where('order_id','==', params.order_id)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc=> {
                doc.ref.update(params)
                order =  {...doc.data(), ...params, id:doc.id}
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

const deleteOrderData = async (params) => {
    let order
    try{
        await orderModel.where('order_id','==', params.order_id)
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
    getOrderData,
    createOrderData,
    updateOrderData,
    deleteOrderData,
    reschedule
}


// Demo Json 
// {
// 	"order_id": 1,
// 	"uid": 11,
// 	"services": [{
// 		"service_id": 1,
// 		"slot_details": {
// 			"timestamp": 1629661642,
// 			"type": "home service"
// 		},
// 		"price": 750,
// 		"status": "Completed"
// 	}],
// 	"products": [{
// 		"product_id": 1,
// 		"price": 1200,
// 		"shipment_status": "On Process"
// 	}],
// 	"timestamp": 1629661642,
// 	"Payment_status": "completed"
// }
