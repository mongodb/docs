var filter = new BsonDocument("type", PlantType.Annual);
var deleteResult = await plantsCollection.DeleteManyAsync(filter);
