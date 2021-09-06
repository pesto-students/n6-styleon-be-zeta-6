const bookingRepo = require("../repositories/booking.repository");
const {GET_SUCCESS,
    GET_FAILED,
    POST_SUCCESS,
    POST_FAILED
} = require("../constants/constant")

const getbookingData = async () => {
    console.log("calledd booking service")
    try {
        const response = await bookingRepo.getbookingData();
        if (response) {
            return {status: 1, message: GET_SUCCESS, response};
        } else {
            return {status: 0, message:  GET_FAILED};
        }
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getbookingData
}