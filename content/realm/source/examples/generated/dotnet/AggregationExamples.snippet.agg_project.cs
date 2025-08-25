var projectStage = new BsonDocument("$project",
    new BsonDocument
    {
        { "_id", 0 },
        { "_partition", 1 },
        { "type", 1 },
        { "name", 1 },
        { "storeNumber",
            new BsonDocument("$arrayElemAt",
                new BsonArray {
                    new BsonDocument("$split",
                    new BsonArray
                    {
                        "$_partition",
                        " "
                    }), 1 }) }
    });

var sortStage = BsonDocument.Parse("{$sort: { storeNumber: 1}}");

var aggResult = await plantsCollection.AggregateAsync(projectStage, sortStage);
foreach (var item in aggResult)
{
    Console.WriteLine($"{item["name"]} is in store #{item["storeNumber"]}.");
}
