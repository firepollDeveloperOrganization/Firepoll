const express = require('express');

const resultHistRouter = express.Router();

resultHistRouter.post('/', (req, res) => {
  console.log('someone wants to make a poll');
})

resultHistRouter.get('/', (req, res) => {
  console.log('someone wants a specific poll');
})

module.exports = resultHistRouter;