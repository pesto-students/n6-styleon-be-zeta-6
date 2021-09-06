const groomingServiceModel = require("../models/groomingServices.model");

const getGroomingServiceData = async (params) => {
    try {
        const snapshot = await groomingServiceModel.get();
        let GroomingServiceData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        return GroomingServiceData;
    } catch (e) {
        console.log(e);
    }
}

const getGroomingServiceByID = async (params) => {
    try {
        const snapshot = await groomingServiceModel.where("service_id", "=", parseInt(params.service_id)).get();
        let GroomingServiceData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        return GroomingServiceData;
    } catch (e) {
        console.log(e);
    }
}

const getGroomingServiceByIDs = async serviceIDs => {
    try {
        const snapshot = await groomingServiceModel.where("service_id", "in", serviceIDs).get();
        let GroomingServiceData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return GroomingServiceData;
    } catch (e) {
        console.log(e);
    }
};

const createGroomingServiceData = async params => {
    try {
        return await groomingServiceModel.add(params);
    } catch (e) {
        console.log(e);
    }
};

const updateGroomingServiceData = async params => {
    console.log("updateGroomingServiceData params", params);
    let groomingService;
    try {
        await groomingServiceModel
            .where("service_id", "==", params.service_id)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update(params);
                    groomingService = { ...doc.data(), ...params, id: doc.id };
                });
            })
            .catch(err => {
                console.log(err);
            });
    } catch (e) {
        console.log(e);
    }
    return groomingService;
};

const deleteGroomingServiceData = async params => {
    let groomingService;
    try {
        await groomingServiceModel
            .where("service_id", "==", params.service_id)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete();
                    groomingService = doc.id;
                });
            })
            .catch(err => {
                console.log(err);
            });
    } catch (e) {
        console.log(e);
    }
    return groomingService;
};

module.exports = {
    getGroomingServiceData,
    createGroomingServiceData,
    updateGroomingServiceData,
    deleteGroomingServiceData,
    getGroomingServiceByID,
    getGroomingServiceByIDs
};

// Demo json
// {
//     "service_id":1,
//     "hero_image":"",
//     "pictures":["","",""],
//     "name":"Men's hair cut",
//     "description":"nice and clean hair cut for men",
//     "salon_id":1,
//     "category":"hair",
//     "duration":60,
//     "suitable":"male",
//     "available_home_slots":[1629707400,1629718200,1629721800],
//     "available_salon_slots":[1629711000,1629714600],
//     "active":true,
//     "original_price":100,
//     "discounted_price":80,
//     "rating":4,
//     "review_id" : [1,2,3,4,5],
//     "recommendations" :[1,2,3,4],
//     "featured":false
// }
