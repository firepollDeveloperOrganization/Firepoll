const express = require('express');
const pollTestData = require('../pollTestData.js');
const pollRouter = express.Router();

// User should be able to create, read, update and delete polls

pollRouter.post('/', (req, res) => {
  console.log('create a post');
  console.log(req.body);
  res.status(200).send();
})

pollRouter.get('/', (req, res) => {
  res.status(200).send(pollTestData);
})

module.exports = pollRouter;

