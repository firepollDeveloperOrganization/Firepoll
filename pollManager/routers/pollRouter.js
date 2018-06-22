const express = require('express');

const pollRouter = express.Router();

pollRouter.post('/', (req, res) => {
  console.log('someone wants to make a poll');
})

pollRouter.get('/', (req, res) => {
  console.log('someone wants a specific poll');
})

module.exports = pollRouter;