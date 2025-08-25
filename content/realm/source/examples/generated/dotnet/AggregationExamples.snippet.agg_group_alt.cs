var groupStep = BsonDocument.Parse(@"
  {
    $group: {
      _id: '$type', 
      count: {
        $sum: 1
      }
    }
  }
");

var sortStep = BsonDocument.Parse("{$sort: { _id: 1}}");

aggResult = await plantsCollection.AggregateAsync(groupStep, sortStep);
foreach (var item in aggResult)
{
    var id = item["_id"];
    var count = item["count"];
    Console.WriteLine($"Id: {id}, Count: {count}");
}
