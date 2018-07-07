const express = require('express');
const notificationsRouter = express.Router();
const twilio = require('twilio');
const axios = require('axios');

notificationsRouter.post('/', (req, res) => {
    res.status(333).send('NOTIFICATION POLL ROUTER!!!');
});

module.exports = notificationsRouter;