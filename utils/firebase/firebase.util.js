const { OAuth2Client } = require("google-auth-library");
const { GOOGLE_CLIENT_ID } = require("../../keys/googleClientId");
const { TOKEN_NOT_VALID, TOKEN_NOT_SUPPLIED } = require("../../constants/constant");

/*
    @checkToken middleware  - Used to check the validity for Id token
    If Token is valid the execution moves to next() 
    If token is not valid or not passed notify the client with proper status code.
*/

let idToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgxOWQxZTYxNDI5ZGQzZDNjYWVmMTI5YzBhYzJiYWU4YzZkNDZmYmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODA5MTc5ODY5NzkwLTY0OWkzMXMzbTBqcGgyNmc0NmFwbWFkZDNhNWo0NjFqLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODA5MTc5ODY5NzkwLTY0OWkzMXMzbTBqcGgyNmc0NmFwbWFkZDNhNWo0NjFqLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1MTM0MDE1NjEzODk4OTgyMTUyIiwiZW1haWwiOiJ2YXJ1bnByYWJoYWthcmFuMjJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJrSndwMkY4ZjlyaGpPV09qV0tGNERnIiwiaWF0IjoxNjMwNTY1ODU2LCJleHAiOjE2MzA1Njk0NTZ9.oCeADnz1IVEz0j4iBTVbaZizOwT55kRL4XLHxhso-ZRY5TtMIamO6bZ0Aud1SB4VHcGOjT5vfJUXQxN4-S3XcSPrVj81EwpD0rdsl-Z7kz6GUlJqUKLx0IyLrg4x0UF3J1qmS0-V6mrlSLiPtl3_ZqA9vFAnIVngRq2PCT6PFJEJcNaPWg6idz57r9-PGC-901ZC1B3pWS7T81_-tM_HOnumwO7udWZHmT6FdZoexkPjp2Sdf36plrXFAStGScorEr_AvOwIsEZlP3a-mqk-Z8rIHan_7TEJF005BxlCbfnm_iMGXhbl1GToYo_NKsj8nKek93AAX--Uh60EBuZKgQ";

const checkToken = async (idtoken, next) => {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);

    if (idToken === undefined || idToken === null) {
        return res.status(401).send({
            success: false,
            message: TOKEN_NOT_SUPPLIED,
        });
    } else {
        try {
            const ticket = await client.verifyIdToken({
                idToken: idToken,
                audience: GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            let currentdate = Math.floor(Date.now() / 1000); 
            console.log("payload", payload)
            if (payload.aud === GOOGLE_CLIENT_ID) next();
        } catch (err) {
            console.log(err);
            return res.status(403).json({
                success: false,
                message: TOKEN_NOT_VALID,
            });
        }
    }
}; 

const decodeToken = async (idtoken) => {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    try{
        console.log("token", idtoken)
        if (idtoken !== undefined || idtoken !== null) {
            try {
                const ticket = await client.verifyIdToken({
                    idToken: idtoken,
                    audience: GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                let currentdate = Math.floor(Date.now() / 1000);
                payload.timestamp = currentdate;
                return payload;
            } catch (err) {
                console.log(err);
            }
        }
    }catch (err) {
        console.log(err);
    }
};

module.exports = { decodeToken, checkToken};
