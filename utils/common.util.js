const userRepo = require('../repositories/user.repository')
const {GET_SUCCESS,GET_FAILED,POST_SUCCESS,POST_FAILED,DELETE_SUCCESS,DELETE_FAILED,
    UPDATE_SUCCESS,UPDATE_FAILED,SCHEMA_PRODUCT,SCHEMA_REVIEW, SCHEMA_SERVICE,SCHEMA_SALON
} = require("../constants/constant")


//Map the reviews with user
const mapReviewWithUsers = async reviews => {
    try{
        let uid = [];
        let userResponse = []
        reviews.map(review => uid.push(review.uid));
        
        if(uid.length > 1) 
            userResponse = await userRepo.getUserByIDs(uid);
        if(uid.length ==1)
            userResponse = await userRepo.getUserByID(uid);
    
        reviews.map(review => {
            userResponse.map(user => {
                if (review.uid === user.uid) {
                    (review.name = user.name), (review.email = user.email);
                }
            });
        });
        return reviews;
    }catch(e){
        console.log(e)
    }
};

//Destructure the Ids
const destructureIds = async (res, type) => {
    try{
        let rIds = []
        if(type === SCHEMA_REVIEW){
            res.forEach(p=>{
                p.review_id.forEach(review=> {
                    rIds.push(review)
                })
            }) 
        }else if(type === SCHEMA_PRODUCT || type === SCHEMA_SERVICE){
            res.forEach(p=>{
                p.recommendations.forEach(recommendation=> {
                    rIds.push(recommendation)
                })
            }) 
        }else if(type === SCHEMA_SALON){
            res.forEach(p=>{
                p.services.forEach(recommendation=> {
                    rIds.push(recommendation)
                })
            }) 
        }
        return rIds
    }catch(e){
        console.log(e)
    }
};


module.exports ={
    mapReviewWithUsers,
    destructureIds
}