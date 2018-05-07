const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/test';

// Database Name
const dbName = 'test';

// use connect method to connect to the server
MongoClient.connect(url, function(err, client){
  assert.equal(null, err);
  console.log("Connected successfully to server!");
  const db = client.db(dbName)

  // Start update many documents (example 53)
  var promise = 
  db.collection('inventory').updateMany(
    { qty: { $lt: 50 } },
    { $set: { "size.uom": "in", status: "P" },
      $currentDate: { lastModified: true } })
  .then(function(result) {
    // process result
    console.log("updateMany example documents modified: " + result.modifiedCount)
  })            
  // End updateMany example
  client.close();
});

