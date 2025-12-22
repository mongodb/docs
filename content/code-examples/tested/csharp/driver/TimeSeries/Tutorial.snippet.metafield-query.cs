var query = new BsonDocument("ticker", "MDB");

var metaFieldResults = stocks.Find(query)
    .Project(Builders<Stocks>.Projection.Exclude("_id"))
    .ToEnumerable();

foreach (var document in metaFieldResults)
{
    Console.WriteLine(document.ToJson());
}

