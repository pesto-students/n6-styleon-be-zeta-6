const userModel = require("../models/user.model");

const getUserByID = async (params) => {
    try {
        const snapshot = await userModel.where("uid", "==", parseInt(params.uid)).get();
        let user = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        return user;
    } catch (e) {
        console.log(e);
    }
}

const getUserByEmail = async (params) => {
    try {
        const snapshot = await userModel.where("email", "==", params.email).get();
        let user = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        return user;
    } catch (e) {
        console.log(e);
    }
}


const getUserByIDs = async (params) => {
    try {
        const snapshot = await userModel.where('uid', 'in', params).get();
        let user = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        return user;
    } catch (e) {
        console.log(e);
    }
}

const saveUser = async (params) => {
    try {
        return await userModel.add(params);
    } catch (e) {
        console.log(e);
    }
};

const updateUser = async (params) => {
    console.log("update reviewData params", params);
    let user;
    try {
        await userModel
            .where("uid", "==", params.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    user = doc.ref.update(params);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (e) {
        console.log(e);
    }
    return user;
};

const deleteUser = async (params) => {
    let user;
    try {
        await userModel
            .where("uid", "==", params.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    user = doc.ref.delete();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (e) {
        console.log(e);
    }
    return user;
};

module.exports = {
    getUserByID,
    saveUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    getUserByIDs
};


// {
//     "uid":"",
//     "name":"",
//     "email":"",
//     "image":"",
//     "address": {
// 		"door_no": "",
// 		"street": "",
// 		"district": "",
// 		"state": "",
// 		"pincode": 641005
// 	},
//     "contact_number":9999999999
// }