const sgMail = require("@sendgrid/mail");
const sendGridKeys = require("../../keys/sendGrid");

sgMail.setApiKey(sendGridKeys.SENDGRID_API_KEY);

/*
    Method to send email via SendGrid
*/
const sendPurchaseEmail = (recepientEmail, recepientName) => {
    //Msg Template
    const msg = {
        to: recepientEmail,
        from: sendGridKeys.senderEmail,
        template_id: "d-a9625667d71e47e5a8965bc4273d16c5",
        subject: "Sending with dynamic email SendGrid is Fun",
        // text: "and easy to do anywhere, even with Node.js haha",
        // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
        personalizations: [
            {
                to: { email: recepientEmail },
                dynamic_template_data: {
                    first_name: recepientName,
                },
            },
        ], 
    };

    let response;
    sgMail
        .send(msg)
        .then(res => {
            console.log("Email sent check now", res);
            response = res;
        })
        .catch(error => {
            console.error(error);
        });
    return response;
};

/*
    Method to send email via SendGrid
*/
const sendRescheduledEmail = (recepientEmail, recepientName, orderID) => {
    //Msg Template
    const msg = {
        to: recepientEmail,
        from: sendGridKeys.senderEmail,
        template_id: "d-a9625667d71e47e5a8965bc4273d16c5",
        subject: "Sending with dynamic email SendGrid is Fun",
        // text: "and easy to do anywhere, even with Node.js haha",
        // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
        personalizations: [
            {
                to: { email: recepientEmail },
                dynamic_template_data: {
                    first_name: recepientName,
                    order_id: orderID,
                },
            },
        ],
    };

    let response;
    sgMail
        .send(msg)
        .then(res => {
            console.log("Email sent check now", res);
            response = res;
        })
        .catch(error => {
            console.error(error);
        });
    return response;
};

const sendOrderCancelledUpdates = (recepientEmail, recepientName, orderID) => {
    //Msg Template
    const msg = {
        to: recepientEmail,
        from: sendGridKeys.senderEmail,
        template_id: "d-a9625667d71e47e5a8965bc4273d16c5",
        subject: "Sending with dynamic email SendGrid is Fun",
        // text: "and easy to do anywhere, even with Node.js haha",
        // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
        personalizations: [
            {
                to: { email: recepientEmail },
                dynamic_template_data: {
                    first_name: recepientName,
                    order_id: orderID,
                },
            },
        ],
    };

    let response;
    sgMail
        .send(msg)
        .then(res => {
            console.log("Email sent check now", res);
            response = res;
        })
        .catch(error => {
            console.error(error);
        });
    return response;
};

const sendEmail = (recepientEmail, recepientName) => {
    const msg = {
        to: recepientEmail,
        from: sendGridKeys.senderEmail,
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node',
        html: '<strong>and easy to do anywhere, even with Node</strong>',
    }
    let response;
    sgMail
        .send(msg)
        .then(res => {
            console.log("Email sent check now", res);
            response = res;
        })
        .catch(error => {
            console.error(error);
        });
    return response;
};

module.exports = {
    sendEmail,
    sendPurchaseEmail,
    sendRescheduledEmail,
    sendOrderCancelledUpdates,
};
