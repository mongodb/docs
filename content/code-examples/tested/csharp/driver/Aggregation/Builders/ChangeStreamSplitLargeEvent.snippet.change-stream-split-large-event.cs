var client = new MongoClient("<connection-string>");

var db = client.GetDatabase("change_stream_test");
var collection = db.GetCollection<LargeDocument>("largeEventCollection");

collection.InsertOne(new LargeDocument
{
    Id = 0,
    LargeField = new string('a', 16 * 1024 * 1024 - 1024)
});

db.RunCommand<BsonDocument>(new BsonDocument
{
    { "collMod", "largeEventCollection" },
    { "changeStreamPreAndPostImages", new BsonDocument("enabled", true) }
});

var pipeline = new EmptyPipelineDefinition<ChangeStreamDocument<LargeDocument>>()
    .ChangeStreamSplitLargeEvent();

var watchOptions = new ChangeStreamOptions
{
    FullDocument = ChangeStreamFullDocumentOption.Required,
    FullDocumentBeforeChange = ChangeStreamFullDocumentBeforeChangeOption.Required
};

using var cursor = collection.Watch(pipeline, watchOptions);

collection.UpdateOne(
    Builders<LargeDocument>.Filter.Eq(d => d.Id, 0),
    Builders<LargeDocument>.Update.Set(d => d.LargeField, new string('b', 16 * 1024 * 1024 - 1024))
);

while (cursor.MoveNext())
{
    foreach (var fragment in cursor.Current)
    {
        Console.WriteLine(fragment.BackingDocument["splitEvent"].ToJson());
    }
}
