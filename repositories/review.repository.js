const reviewModel = require("../models/review.model.");

const getReviews = async (params) => {
    try {
        const snapshot = await reviewModel.get();
        let reviewData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        return reviewData;
    } catch (e) {
        console.log(e);
    }
}

const getReviewsByIds = async (params) => {
    try {
        const snapshot = await reviewModel.where("review_id", "in", params).get();
        let reviewData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        return reviewData;
    } catch (e) {
        console.log(e);
    }
}



const createReview = async (params) => {
    try {
        return await reviewModel.add(params)
    } catch (e) {
        console.log(e);
    }
}

const updateReview = async (params) => {
    console.log("update reviewData params", params)
    let review
    try{
        await reviewModel.where('review_id','==', params.review_id)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc=> {
                review =  doc.ref.update(params);
            });
        })
        .catch(err => {
            console.log(err)
        })
    }catch (e) { 
        console.log(e);
    }
    return review;
}

const deleteReview = async (params) => {
    let review
    try{
        await reviewModel.where('review_id','==', params.review_id)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc=> {
                review =  doc.ref.delete();
            });
        })
        .catch(err => {
            console.log(err)
        })
    }catch (e) {
        console.log(e);
    }
    return review;
}


module.exports = {
    getReviews,
    createReview,
    updateReview,
    deleteReview,
    getReviewsByIds
}

// Demo json
// {
//     "uid":3, 
//     "review_id":3,
//     "title":"Service was fantastic",
//     "review":"stylist is so friendly",
//     "media":["","",""]
// } 
