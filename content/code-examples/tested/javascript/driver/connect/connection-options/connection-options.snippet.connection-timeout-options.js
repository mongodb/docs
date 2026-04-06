const client = new MongoClient(uri, {
  connectTimeoutMS: 2000,
  socketTimeoutMS: 2000,
});
