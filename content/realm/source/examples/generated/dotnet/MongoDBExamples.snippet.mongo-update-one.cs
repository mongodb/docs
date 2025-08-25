var updateResult = await plantsCollection.UpdateOneAsync(
    new { name = "Petunia" },
    new BsonDocument("$set", new BsonDocument("sunlight", Sunlight.Partial.ToString()))
    );
