var filter = new BsonDocument()
    .Add("name", "Pothos")
    .Add("type", PlantType.Perennial.ToString())
    .Add("sunlight", Sunlight.Full.ToString());

var updateResult = await plantsCollection.UpdateOneAsync(
    filter,
    new BsonDocument("$set", new BsonDocument("_partition", "Store 42")),
    upsert: true);

/* The upsert will create the following object:

{
   "name": "pothos",
   "sunlight": "full",
   "type": "perennial",
   "_partition": "Store 42"
}
*/
