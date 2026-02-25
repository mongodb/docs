var collectionInfoCursor = await
    database.ListCollectionsAsync(
        new ListCollectionsOptions { Filter = new BsonDocument("name", "weather24h") });
var collectionInfo = await collectionInfoCursor.FirstOrDefaultAsync();
if (collectionInfo != null)
{
    return collectionInfo["options"]["expireAfterSeconds"];
}
