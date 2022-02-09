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

  // Delete many documents (example 56)
  var promise = 
  db.collection('inventory').deleteMany({ 
    status: "A" 
  })
  .then(function(result) {
    // process result
    console.log("deleteMany example result: " + result)
  })            
  // End deleteMany example
  client.close();
});

