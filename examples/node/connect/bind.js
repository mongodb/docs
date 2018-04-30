const MongoClient = require('mongodb').MongoClient;
const f = require('util').format;
const assert = require('assert');

const user = encodeURIComponent('testuser');
const password = encodeURIComponent('<PASSWORD>');
const authMechanism = 'DEFAULT';

// Connection URL
const url = f('mongodb://%s:%s@localhost:27017/test?authSource=admin',
  user, password);

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
  console.log(url); 
  assert.equal(null, err);
  const dbName = "test";
  const db = client.db(dbName);
  client.close();
});
