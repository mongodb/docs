await _collection?.Indexes.CreateOneAsync(new CreateIndexModel<BsonDocument>(
    Builders<BsonDocument>.IndexKeys.Ascending("timestamp")))!;
