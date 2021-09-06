const productModel = require("../models/product.model");


const getProductData = async (params) => {
    try {
        const snapshot = await productModel.get();
        let productData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        return productData;
    } catch (e) {
        console.log(e);
    }
}

const getProductByID = async params => {
    console.log("params", params);
    try {
        const snapshot = await productModel.where("product_id", "=", parseInt(params.product_id)).get();
        let productData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return productData;
    } catch (e) {
        console.log(e);
    }
};

const getProductByIds = async productIds => {
    try {
        const snapshot = await productModel.where("product_id", "in", productIds).get();
        let productData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return productData;
    } catch (e) {
        console.log(e);
    }
};

const createProductData = async params => {
    try {
        return await productModel.add(params);
    } catch (e) {
        console.log(e);
    }
};

const updateProductData = async params => {
    console.log("updateProductData params", params);
    let product;
    try {
        await productModel
            .where("product_id", "==", params.product_id)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update(params);
                    product = { ...doc.data(), ...params, id: doc.id };
                });
            })
            .catch(err => {
                console.log(err);
            });
    } catch (e) {
        console.log(e);
    }
    return product;
};

const deleteProductData = async params => {
    let product;
    try {
        await productModel
            .where("product_id", "==", params.product_id)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete();
                    product = doc.id;
                });
            })
            .catch(err => {
                console.log(err);
            });
    } catch (e) {
        console.log(e);
    }
    return product;
};

module.exports = {
    getProductData,
    createProductData,
    updateProductData,
    deleteProductData,
    getProductByIds,
    getProductByID,
};


// Demo Json 
// {
//     "product_id" :716,
//     "images" :["","","",""],
//     "description" : "skin care" ,
//     "product_name" : "mask" ,
//     "brand_name" : "loreal" ,
//     "category" : "skin" ,
//     "suitable" : "unisex" ,
//     "active" :true,
//     "original_price" :100,
//     "discounted_price" :70,
//     "rating" :4,
//     "review_id" : [1,2,3,4,5],
//     "recommendations" :[1,2,3,4],
//     "featured" :true
// } 

    