const salonModel = require("../models/salon.model")

const getSalonData = async (params) => {
    try {
        const snapshot = await salonModel.get();
        let salonData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        return salonData;
    } catch (e) {
        console.log(e);
    }
}

const getSalonByID = async (params) => {
    try {
        const snapshot = await salonModel.where("salon_id", "=", parseInt(params.salon_id)).get();
        let salonData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        return salonData;
    } catch (e) {
        console.log(e);
    }
}

const createSalonData = async (params) => {
    try {
        return await salonModel.add(params)
    } catch (e) {
        console.log(e);
    }
}

const updateSalonData = async (params) => {
    console.log("updateSalonData params", params)
    let salon;
    try{
        await salonModel.where('salon_id','==', params.salon_id)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc=> {
                doc.ref.update(params)
                salon =  {...doc.data(), ...params, id:doc.id}
            });
        })        
        .catch(err => {
            console.log(err)
        })
    }catch (e) { 
        console.log(e);
    }
    return salon;
}

const deleteSalonData = async (params) => {
    let salon
    try{
        await salonModel.where('salon_id','==', params.salon_id)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc=> {
                doc.ref.delete()
                salon = doc.id
            });
        })
        .catch(err => {
            console.log(err)
        })
    }catch (e) {
        console.log(e);
    }
    return salon;
}


module.exports = {
    getSalonData,
    createSalonData,
    updateSalonData,
    deleteSalonData,
    getSalonByID,
}

// Demo Json 
// {
// 	"salon_id": 4,
// 	"name": "Fresh",
// 	"hero_image": "https",
// 	"pictures": ["", ""],
// 	"reviews": [6, 7, 8, 9, 10],
// 	"active": true,
// 	"address": {
// 		"door_no": "",
// 		"street": "",
// 		"district": "",
// 		"state": "",
// 		"pincode": 641005
// 	},
// 	"timings": "10AM - 10PM",
// 	"services": [1, 2, 3, 4, 5],
// 	"description": "exclusive salon"
// }


