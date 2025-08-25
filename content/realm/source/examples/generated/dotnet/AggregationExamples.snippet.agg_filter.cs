var matchStage = new BsonDocument("$match",
        new BsonDocument("type",
            new BsonDocument("$eq",
                PlantType.Perennial)));

// Alternate approach using BsonDocument.Parse(...)
matchStage = BsonDocument.Parse(@"{
  $match: {
    type: { $eq: '" + PlantType.Perennial + @"' }
  }}");

var sortStage = BsonDocument.Parse("{$sort: { _id: 1}}");

var aggResult = await plantsCollection.AggregateAsync<Plant>(matchStage, sortStage);
foreach (var plant in aggResult)
{
    Console.WriteLine($"Plant Name: {plant.Name}, Color: {plant.Color}");
}
