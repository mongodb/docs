using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

public class FacetExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");

    public BsonDocument RunFacetPipeline()
    {
        // :snippet-start: facet
        var bucketPipeline = new EmptyPipelineDefinition<Movie>()
            .BucketAuto(
                groupBy: m => m.Runtime,
                buckets: 5);
        var bucketFacet = AggregateFacet.Create(
            name: "Runtimes",
            pipeline: bucketPipeline);

        var countLimitPipeline = new EmptyPipelineDefinition<Movie>()
            .SortByCount(m => m.Rated)
            .Limit(5);
        var countFacet = AggregateFacet.Create(
            "Ratings", countLimitPipeline);

        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Facet(bucketFacet, countFacet);
        // :snippet-end:

        // :remove-start:
        using var client = new MongoClient(_uri);
        var collection = client
            .GetDatabase("sample_mflix")
            .GetCollection<Movie>("movies");
        var bsonPipeline = pipeline
            .As<Movie, AggregateFacetResults, BsonDocument>(
                BsonDocumentSerializer.Instance);
        return collection.Aggregate(bsonPipeline).Single();
        // :remove-end:
    }
}
