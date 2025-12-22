// Initialize date range
var startTime = DateTime.Parse("2021-12-18T15:50:00Z");
var endTime = DateTime.Parse("2021-12-18T15:56:00Z");

// Define the query filter
var query = new BsonDocument("$and", new BsonArray
{
    new BsonDocument("date", new BsonDocument("$gte", startTime)),
    new BsonDocument("date", new BsonDocument("$lte", endTime))
});

var metaFieldResults = stocks.Find(query)
    .Project(Builders<Stocks>.Projection.Exclude("_id"))
    .ToEnumerable();

foreach (var document in metaFieldResults)
{
    Console.WriteLine(document.ToJson());
}

