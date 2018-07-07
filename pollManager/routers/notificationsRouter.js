const express = require('express');
const notificationsRouter = express.Router();
const twilio = require('twilio');
const axios = require('axios');

const accountSid = 'AC2d485f8969426f357d5930d8c579e71d'; // Your Account SID from www.twilio.com/console
const authToken = '3fe906ddb7b72e790ef7749a56d36533';   // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

notificationsRouter.post('/', (req, res) => {
    console.log(req.body);
    let {link, phoneNumber} = req.body;
    res.status(222).send('NOTIFICATION POLL ROUTER!!!');
    client.messages.create({
        body: `Here's the link to your Fire Poll! ${link} Thanks for Voting!`,
        // to: '+19173318874',
        to: `+1${phoneNumber}`,
        from: '+19738334983'
    })
    .then(message => console.log(message));
});

module.exports = notificationsRouter;