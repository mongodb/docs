using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace VectorSearch;

class Program
{
    static void Main(string[] args)
    {
        // Map title-case class properties to camel-case MongoDB fields
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);
        
        // Connect to your deployment
        const string mongoConnectionString = "<connection string>";
        var client = new MongoClient(mongoConnectionString);

        // Access your database and collection
        var database = client.GetDatabase("sample_airbnb");
        var collection = database.GetCollection<Listing>("listingsAndReviews");
        
        CreateIndex(client, collection, "vector_index");
        //RunQuery(client, collection, "vector_index");
    }

    private static void CreateIndex(MongoClient client, IMongoCollection<Listing> collection, string indexName)
    {
        // Create your index model, then create the search index
        var model = new CreateAutoEmbeddingVectorSearchIndexModel<Listing>(
            l => l.Summary,
            indexName,
            "voyage-4",
            l => l.Address.Country,
            l => l.Bedrooms  
        ); 

        var searchIndexView = collection.SearchIndexes;
        searchIndexView.CreateOne(model);
        Console.WriteLine($"New search index named {indexName} is building.");

        // Wait for initial sync to complete
        Console.WriteLine("Polling to check if the index is ready. This may take up to a minute.");

        bool isReady = false;
        while (!isReady)
        {
            var indexes = searchIndexView.List();
            foreach (var index in indexes.ToEnumerable())
            {
                if (index["name"] == indexName)
                {
                    isReady = index.Contains("latestDefinition");
                }
            }

            if (!isReady)
            {
                Thread.Sleep(5000);
            }
        }    
        
        Console.WriteLine($"{indexName} is ready for querying.");
    }

    private static void RunQuery(
        MongoClient client,
        IMongoCollection<Listing> collection,
        string indexName)
    {
        var options = new VectorSearchOptions<Listing>()
        {
            IndexName = indexName,
            NumberOfCandidates = 100
        };
        
        var results = collection.Aggregate()
            .VectorSearch(
                l => l.Summary,
                "close to amusement parks",
                10,
                options)
            .Project(Builders<Listing>.Projection
                .Exclude(l => l.Id)
                .Include(l => l.Name)
                .Include(l => l.Summary)
                .Include(l => l.Address)
                .Include(l => l.Price)
                .Include(l => l.Bedrooms)
                .MetaVectorSearchScore("score"))
            .ToList();
        
        foreach (var listing in results)
        {
            Console.WriteLine(listing.ToJson());
        }
    } 
}
