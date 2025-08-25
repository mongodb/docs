var groupStage =
    new BsonDocument("$group",
        new BsonDocument
        {
            { "_id", "$type" },
            { "count", new BsonDocument("$sum", 1) }
        });

var sortStage = new BsonDocument("$sort",
    new BsonDocument("_id", 1));

var aggResult = await plantsCollection.AggregateAsync(groupStage, sortStage);
foreach (var item in aggResult)
{
    var id = item["_id"];
    var count = item["count"];
    Console.WriteLine($"Plant type: {id}; count: {count}");
}

