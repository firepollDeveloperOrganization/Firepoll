const express = require('express');
const stageRouter = express.Router();

// Users should be able to create, and read results;

stageRouter.post('/', (req, res) => {
  console.log('someone wants to make a poll');
})

stageRouter.get('/', (req, res) => {
  console.log('someone wants a specific poll');
})

module.exports = stageRouter;