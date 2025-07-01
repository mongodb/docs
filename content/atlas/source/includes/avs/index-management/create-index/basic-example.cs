namespace query_quick_start;

using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading;

public class IndexService
{
    // Replace the placeholder with your Atlas connection string
    private const string MongoConnectionString = "<connection-string>";
    public void CreateVectorIndex()
    {
        try
        {
            // Connect to your Atlas cluster
            var client = new MongoClient(MongoConnectionString);
            var database = client.GetDatabase("sample_mflix");
            var collection = database.GetCollection<BsonDocument>("embedded_movies");

            var searchIndexView = collection.SearchIndexes;
            var name = "vector_index";
            var type = SearchIndexType.VectorSearch;

            var definition = new BsonDocument
            {
                { "fields", new BsonArray
                    {
                        new BsonDocument
                        {
                            { "type", "vector" },
                            { "path", "plot_embedding" },
                            { "numDimensions", 1536 },
                            { "similarity", "dotProduct" },
                            { "quantization", "scalar" }
                        }
                    }
                }
            };

            var model = new CreateSearchIndexModel(name, type, definition);

            searchIndexView.CreateOne(model);
            Console.WriteLine($"New search index named {name} is building.");

            // Polling for index status
            Console.WriteLine("Polling to check if the index is ready. This may take up to a minute.");
            bool queryable = false;
            while (!queryable)
            {
                var indexes = searchIndexView.List();
                foreach (var index in indexes.ToEnumerable())
                {
                    if (index["name"] == name)
                    {
                        queryable = index["queryable"].AsBoolean;
                    }
                }
                if (!queryable)
                {
                    Thread.Sleep(5000);
                }
            }
            Console.WriteLine($"{name} is ready for querying.");
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception: {e.Message}");
        }
    }
}
