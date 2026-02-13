_collection?.Indexes.CreateOne(
    new CreateIndexModel<BsonDocument>(
        Builders<BsonDocument>.IndexKeys
            .Ascending("metadata.type")
            .Descending("timestamp")));
