var filter = new { _partition = "Store 47" };
var updateDoc = new BsonDocument("$set",
    new BsonDocument("_partition", "Area 51"));

var updateResult = await plantsCollection.UpdateManyAsync(
    filter, updateDoc);
