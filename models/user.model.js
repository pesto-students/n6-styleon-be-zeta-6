const {connection_firebase} = require("../config/connection.firebase");



module.exports = UserModel = connection_firebase.collection("Users");