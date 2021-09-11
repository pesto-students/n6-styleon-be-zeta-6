const globalModel = require("../models/global.model")

const getReviewID = async (params) => {
    try {
        const snapshot = await globalModel.get();
        let reviewData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        let updatedReviewId = reviewData[0].review_id + 1;
        await globalModel.get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc=> { 
                doc.ref.update({
                    review_id: updatedReviewId
                })
            });
        })
        
        return updatedReviewId;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getReviewID,
}

