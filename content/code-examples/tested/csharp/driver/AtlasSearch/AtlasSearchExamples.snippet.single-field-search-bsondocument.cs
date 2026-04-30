var result = moviesCollectionBson.Aggregate()
    .Search(Builders<BsonDocument>.Search.Text(
        Builders<BsonDocument>.SearchPath.Single("plot"), "secret agent"))
    .ToList();
