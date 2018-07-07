const express = require('express');
const notificationsRouter = express.Router();
const axios = require('axios');
const client = require('../notificationsConfig.js')

notificationsRouter.post('/', (req, res) => {
    console.log(req.body);
    let {link, phoneNumber} = req.body;
    res.status(222).send('NOTIFICATION POLL ROUTER!!!');
    client.messages.create({
        body: `Here's the link to your Fire Poll! ${link} Thanks for Voting!`,
        to: `+1${phoneNumber}`,
        from: '+19738334983'
    })
    .then(message => console.log(message));
});

module.exports = notificationsRouter;