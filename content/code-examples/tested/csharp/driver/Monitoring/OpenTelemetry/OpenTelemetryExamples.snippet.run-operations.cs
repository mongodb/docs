var filter = Builders<BsonDocument>.Filter.Eq("title", "Back to the Future");
var movie = collection.Find(filter).First();
