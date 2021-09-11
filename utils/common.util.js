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


/*
    Util Method to create timestamp for service booking calender
*/
const createTimeStamp = ()=>{
    let available_home_slots = {}
    let initialTime  = 1631212200
    let oneDayTimeStamp = 86400;
    let oneHourTimeStamp = 3600;
    let intervalOneHour
    //For number of days
    for(let i=1; i<=45; i++){
        let obj = {}
        let timeStamp = initialTime.toString()
        let particularDaySlots = []
        //Shop open at 10 AM
        let nine_AM = oneHourTimeStamp * 9 ;
        //For particular day available time slots
        for(let j=3600; j<=36000; j= j+3600){
            intervalOneHour = initialTime + (nine_AM + j);
            particularDaySlots.push(intervalOneHour)
        }

        //shop closed at 7PM and reassign the initialtime to next day's timestamp
        initialTime = initialTime + oneDayTimeStamp;
        //Create obj for one day timestamp
        obj = { [timeStamp]: particularDaySlots };

        //Merge all the days to form one month time span
        available_home_slots = {...available_home_slots, ...obj}
    }
    console.log("available_home_slots", available_home_slots);
}


module.exports ={
    mapReviewWithUsers,
    destructureIds,
    createTimeStamp
}