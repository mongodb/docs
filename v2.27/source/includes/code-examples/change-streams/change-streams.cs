// start-open-change-stream
var database = client.GetDatabase("sample_restaurants");
var collection = database.GetCollection<Restaurant>("restaurants");

// Opens a change stream and prints the changes as they're received
using (var cursor = collection.Watch())
{
    foreach (var change in cursor.ToEnumerable())
    {
        Console.WriteLine("Received the following type of change: " + change.BackingDocument);
    }
}
// end-open-change-stream

// start-open-change-stream-async
var database = client.GetDatabase("sample_restaurants");
var collection = database.GetCollection<Restaurant>("restaurants");

// Opens a change streams and print the changes as they're received
using var cursor = await collection.WatchAsync();
await cursor.ForEachAsync(change =>
{
    Console.WriteLine("Received the following type of change: " + change.BackingDocument);
});
// end-open-change-stream-async

// start-modify-document
var database = client.GetDatabase("sample_restaurants");
var collection = database.GetCollection<Restaurant>("restaurants");

var filter = Builders<Restaurant>.Filter
    .Eq(restaurant => restaurant.Name, "Blarney Castle");

var update = Builders<Restaurant>.Update
    .Set(restaurant => restaurant.Cuisine, "Irish");

var result = collection.UpdateOne(filter, update);
// end-modify-document

// start-change-stream-pipeline-async
var pipeline = new EmptyPipelineDefinition<ChangeStreamDocument<Restaurant>>()
            .Match(change => change.OperationType == ChangeStreamOperationType.Update);

// Opens a change stream and prints the changes as they're received
using (var cursor = await _restaurantsCollection.WatchAsync(pipeline))
{
    await cursor.ForEachAsync(change =>
    {
        Console.WriteLine("Received the following change: " + change);
    });
}
// end-change-stream-pipeline-async

// start-change-stream-pipeline
var pipeline = new EmptyPipelineDefinition<ChangeStreamDocument<Restaurant>>()
            .Match(change => change.OperationType == ChangeStreamOperationType.Update);

// Opens a change streams and print the changes as they're received
using (var cursor = _restaurantsCollection.Watch(pipeline))
{
    foreach (var change in cursor.ToEnumerable())
    {
        Console.WriteLine("Received the following change: " + change);
    }
}
// end-change-stream-pipeline

// start-change-stream-post-image
var pipeline = new EmptyPipelineDefinition<ChangeStreamDocument<Restaurant>>()
    .Match(change => change.OperationType == ChangeStreamOperationType.Update);

var options = new ChangeStreamOptions
{
    FullDocument = ChangeStreamFullDocumentOption.UpdateLookup,
};

using (var cursor = _restaurantsCollection.Watch(pipeline, options))
{
    foreach (var change in cursor.ToEnumerable())
    {
        Console.WriteLine(change.FullDocument.ToBsonDocument());
    }
}
// end-change-stream-post-image

// start-change-stream-post-image-async
var pipeline = new EmptyPipelineDefinition<ChangeStreamDocument<Restaurant>>()
    .Match(change => change.OperationType == ChangeStreamOperationType.Update);

var options = new ChangeStreamOptions
{
    FullDocument = ChangeStreamFullDocumentOption.UpdateLookup,
};

using var cursor = await _restaurantsCollection.WatchAsync(pipeline, options);
await cursor.ForEachAsync(change =>
{
    Console.WriteLine(change.FullDocument.ToBsonDocument());
});
// end-change-stream-post-image-async