var filter = new BsonDocument("name", "Thai Basil");
var deleteResult = await plantsCollection.DeleteOneAsync(filter);
