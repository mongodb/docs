using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

public class DocumentsExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");

    public List<BsonDocument> RunDocumentsPipeline()
    {
        // :snippet-start: documents
        var documentArray = new[]
        {
            new BsonDocument {{ "title", "The Shawshank Redemption" }},
            new BsonDocument {{ "title", "Back to the Future" }},
            new BsonDocument {{ "title", "Jurassic Park" }},
        };

        var pipeline = new EmptyPipelineDefinition<NoPipelineInput>()
            .Documents(documentArray);
        // :snippet-end:
        using var client = new MongoClient(_uri);
        return client.GetDatabase("test").Aggregate(pipeline).ToList();
    }
}
