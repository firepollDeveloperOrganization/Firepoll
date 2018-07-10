const nock = require('nock');
const testPoll = require('./testData');

const host = 'http://127.0.0.1:5000';

const mockServer = nock(host);

module.exports = mockServer;