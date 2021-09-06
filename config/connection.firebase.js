const firebase = require('firebase-admin');
const serviceAccount = require('../keys/firebase.json')


//Initialize Firebase with credentials
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});


const connection_firebase = firebase.firestore();


module.exports = {connection_firebase}