const MongoClient = require('mongodb').MongoClient;
const f = require('util').format;
const assert = require('assert');

const user = encodeURIComponent('testuser');
const password = encodeURIComponent('<PASSWORD>');

// Connection URL
const url = f('mongodb://%s:%s@localhost:27017/test?authSource=admin', user, password);


// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
   
   console.log(url);
   
   assert.equal(null, err);
 
   const dbName = "test";
   
   const db = client.db(dbName);
  
    var promise = db.collection('inventory').insertMany([
  { item: "journal",
    qty: 25,
    size: { h: 14, w: 21, uom: "cm" },
    status: "A"},
  { item: "notebook",
    qty: 50,
    size: { h: 8.5, w: 11, uom: "in" },
    status: "A"},
  { item: "paper",
    qty: 100,
    size: { h: 8.5, w: 11, uom: "in" },
    status: "D"},
  { item: "planner",
    qty: 75, size: { h: 22.85, w: 30, uom: "cm" },
    status: "D"},
  { item: "postcard",
    qty: 45,
    size: { h: 10, w: 15.25, uom: "cm" },
    status: "A"}
])
.then(function(result) {
    // process result
})
  client.close();
});
