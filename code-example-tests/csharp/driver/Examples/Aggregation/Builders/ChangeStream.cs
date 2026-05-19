using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

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
