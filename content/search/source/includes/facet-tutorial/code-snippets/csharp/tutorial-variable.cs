using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;
using System;

public class FacetExample
{
    private const string MongoConnectionString = "<your-connection-string>";

    public static void Main(string[] args)
    {
        // Register camelCase conventions for document mapping
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, t => true);

        // Connect to your MongoDB Atlas cluster
        var mongoClient = new MongoClient(MongoConnectionString);
        var mflixDatabase = mongoClient.GetDatabase("sample_mflix");
        var moviesCollection = mflixDatabase.GetCollection<MovieDocument>("movies");

        // Define the origin date for the `near` operator
        var originDate = new DateTime(1921, 11, 01, 0, 0, 0, DateTimeKind.Utc);

        // Create an array of BsonValues for the number boundaries
        var yearBoundaries = new BsonArray { 1910, 1920, 1930, 1940 };

        // Define the $search stage 
        var searchStage = Builders<MovieDocument>.Search.Facet(
            Builders<MovieDocument>.Search.Near(
                "released", // The field to search
                origin: originDate, // Starting date
                pivot: 7776000000 // Pivot (milliseconds)
            ),
            Builders<MovieDocument>.SearchFacet.String(
                "genresFacet", // Name of the string facet
                "genres" // The field to facet on
            ),
            Builders<MovieDocument>.SearchFacet.Number(
                "yearFacet", // Name of the number facet
                "year", // The field to facet on
                yearBoundaries 
            )
        );

        // Step 2: Aggregate pipeline implementationdd
        var pipeline = moviesCollection.Aggregate()
            .Search(searchStage, indexName: "facet-tutorial") 
            .AppendStage<BsonDocument>(new BsonDocument
            {
                { "$facet", new BsonDocument
                    {
                        { "meta", new BsonArray
                            {
                                new BsonDocument { { "$replaceWith", "$$SEARCH_META" } },
                                new BsonDocument { { "$limit", 1 } }
                            }
                        }
                    }
                }
            })
            .AppendStage<BsonDocument>(new BsonDocument
            {
                { "$set", new BsonDocument
                    {
                        { "meta", new BsonDocument
                            {
                                { "$arrayElemAt", new BsonArray { "$meta", 0 } }
                            }
                        }
                    }
                }
            })
            .ToList();

        // Step 3: Output results
        foreach (var result in pipeline)
        {
            Console.WriteLine(result.ToJson());
        }
    }
}

[BsonIgnoreExtraElements]
public class MovieDocument
{
    [BsonIgnoreIfDefault]
    public ObjectId Id { get; set; }
    public string[] Genres { get; set; }
    public DateTime Released { get; set; }
    public int Year { get; set; }
}
