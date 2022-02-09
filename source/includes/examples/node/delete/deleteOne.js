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

  // Delete a single document (example 58)
  var promise = 
  db.collection('inventory').deleteOne({ 
    status: "D" 
  })
  .then(function(result) {
    // process result
    console.log("deleteOne example result: " + result)
  })            
  // End deleteOne example
  client.close();
});

