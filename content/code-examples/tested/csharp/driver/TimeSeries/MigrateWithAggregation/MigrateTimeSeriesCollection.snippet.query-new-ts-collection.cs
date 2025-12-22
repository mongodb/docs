var newCollection = database.GetCollection<BsonDocument>(weather_new);
var result = newCollection.Find(_ => true).ToList();
return result;
