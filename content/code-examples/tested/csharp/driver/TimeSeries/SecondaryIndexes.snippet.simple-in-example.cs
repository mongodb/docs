var filter = Builders<BsonDocument>.Filter
    .In("metadata.type", new[] { "temperature", "pressure" });
