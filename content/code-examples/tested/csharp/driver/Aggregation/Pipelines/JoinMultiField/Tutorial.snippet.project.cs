.Project(Builders<BsonDocument>.Projection
    .Exclude("_id")
    .Exclude("Description")
);
