var deleteResult = await userDataCollection.DeleteOneAsync(
    new BsonDocument("_id", user.Id));

// The `DeletedCount` should be 1
Console.WriteLine(deleteResult.DeletedCount);

// There should no longer be a custom user document for the user
var customData = await userDataCollection.FindOneAsync(
    new BsonDocument("_id", user.Id));

Console.WriteLine(customData == null);

