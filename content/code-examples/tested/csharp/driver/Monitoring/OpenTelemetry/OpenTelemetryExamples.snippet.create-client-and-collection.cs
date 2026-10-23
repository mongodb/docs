var connectionString = "<connection string>";
var client = new MongoClient(connectionString);
var collection = client.GetDatabase("sample_mflix").GetCollection<BsonDocument>("movies");
