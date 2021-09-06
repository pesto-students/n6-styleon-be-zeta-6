const {connection_algolia} = require("../../config/algolia.connection");

const createIndex = async (data,res,indexName)=>{
    const firestoreObjectID = res["_path"].segments[1];
    console.log("firestoreObjectID",firestoreObjectID)
    console.log("firestoreObjectID",firestoreObjectID)
    const index = await connection_algolia.initIndex(indexName)
    let response = index
        .saveObject({...data, objectID:firestoreObjectID})
        .then( res => {
           response = res;
        })
        .catch(err => {
            console.log(err);
        })
    
}

const updateIndex = async (res,indexName)=>{
    const firestoreObjectID = res.id;
    delete res.id;
    console.log("res after deleting",res)
    console.log("firestoreObjectID updateee",firestoreObjectID)
    const index = await connection_algolia.initIndex(indexName)
    let response = index
        .saveObject({...res, objectID:firestoreObjectID})
        .then( res => {
           response = res;
        })
        .catch(err => {
            console.log(err);
        })

}

const deleteIndex = async (res,indexName)=>{
    const firestoreObjectID = res;
    console.log("res ",res)
    const index = await connection_algolia.initIndex(indexName)
    let response = index
        .deleteObject(firestoreObjectID)
        .catch(err => {
            console.log(err);
        })
}


module.exports ={
    createIndex,
    updateIndex,
    deleteIndex
}