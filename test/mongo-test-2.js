// NPM install mongoose and chai. Make sure mocha is globally
// installed
const mongoose = require('mongoose');
const {expect} = require('chai');
const schema = require('../db/schema');
const axios = require('axios');


// // Create a new test schema
// const testSchema = mongoose.Schema(schema);

// //Create a new collection called 'test'
// const Test = mongoose.model('Test', testSchema);

// describe('Database Tests', function() {
//   //Before starting the test, create a sandboxed database connection
//   //Once a connection is established invoke done()
//   before(function (done) {
//     mongoose.connect('mongodb://laurents:stx7JBM-X@ds217131.mlab.com:17131/live-polling-service');
//     const db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'connection error'));
//     db.once('open', function() {
//       console.log('We are connected to test database!');
//       done();
//     });
//   });
//   describe('Test Database', function() {
//     //Save object with 'name' value of 'Mike"
//     it('should save a poll to the database', function(done) {
      
//     });
//     it('Dont save incorrect format to database', function(done) {
//       //Attempt to save with wrong info. An error should trigger
//       var wrongSave = Name({
//         notName: 'Not Mike'
//       });
//       wrongSave.save(err => {
//         if(err) { return done(); }
//         throw new Error('Should generate error!');
//       });
//     });
//     it('Should retrieve data from test database', function(done) {
//       //Look up the 'Mike' object previously saved.
//       Name.find({name: 'Mike'}, (err, name) => {
//         if(err) {throw err;}
//         if(name.length === 0) {throw new Error('No data!');}
//         done();
//       });
//     });
//   });
//   //After all tests are finished drop database and close connection
//   after(function(done){
//     mongoose.connection.db.dropDatabase(function(){
//       mongoose.connection.close(done);
//     });
//   });
// });