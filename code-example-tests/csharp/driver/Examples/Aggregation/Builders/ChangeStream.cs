using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

[BsonIgnoreExtraElements]
public class Movie
{
    [BsonId]
    public ObjectId Id { get; set; }
    public string Title { get; set; } = null!;
}

public class ChangeStreamExample
{
    public bool BuildChangeStreamPipeline()
    {
        // :snippet-start: change-stream
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .ChangeStream();
        // :snippet-end:
        return pipeline != null; // :remove:
    }

    public bool BuildChangeStreamPipelineWithOptions()
    {
        // :snippet-start: change-stream-options
        var changeStreamOptions = new ChangeStreamStageOptions()
        {
            FullDocument = ChangeStreamFullDocumentOption.Default,
            StartAtOperationTime = new BsonTimestamp(300),
        };

        var pipeline = new EmptyPipelineDefinition<Movie>()
            .ChangeStream(changeStreamOptions);
        // :snippet-end:
        return pipeline != null; // :remove:
    }
}
