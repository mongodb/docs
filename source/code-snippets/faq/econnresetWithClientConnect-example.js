// create a new MongoClient
const client = new MongoClient(
  "mongodb://localhost:27017/test?maxPoolSize=5000",
);
client.connect(function(err) {
  // connection
});
