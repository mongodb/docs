namespace Examples.Aggregation.Linq;

using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

public class QueryResults : IDisposable
{
    private readonly MongoClient _client;

    public QueryResults()
    {
        var uri = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(uri);
    }

    public void Dispose() => _client.Dispose();

    private IQueryable<Restaurant> GetQueryable() =>
        _client
            .GetDatabase("sample_restaurants")
            .GetCollection<Restaurant>("restaurants")
            .AsQueryable();

    public List<BsonDocument> IterateSynchronously()
    {
        var query = GetQueryable()
            .Where(r => r.Name == "The Movable Feast")
            .Select(r => new { name = r.Name, address = r.Address });

        var results = new List<BsonDocument>();
        // :snippet-start: iterate-synchronously
        foreach (var restaurant in query)
        {
            Console.WriteLine(restaurant.ToJson());
            results.Add(restaurant.ToBsonDocument()); // :remove:
        }
        // :snippet-end:
        return results;
    }

    public List<BsonDocument> ConvertToList()
    {
        var query = GetQueryable()
            .Where(r => r.Name == "The Movable Feast")
            .Select(r => new { name = r.Name, address = r.Address });

        // :snippet-start: convert-to-list
        var results = query.ToList();
        // :snippet-end:
        return results.Select(r => r.ToBsonDocument()).ToList();
    }

    public List<BsonDocument> ConvertToCursor()
    {
        var query = GetQueryable()
            .Where(r => r.Name == "The Movable Feast")
            .Select(r => new { name = r.Name, address = r.Address });

        // :snippet-start: convert-to-cursor
        var results = query.ToCursor();
        // :snippet-end:
        return results.ToList().Select(r => r.ToBsonDocument()).ToList();
    }

    public async Task<List<BsonDocument>> IterateAsynchronously()
    {
        var query = GetQueryable()
            .Where(r => r.Name == "The Movable Feast")
            .Select(r => new { name = r.Name, address = r.Address });

        var results = new List<BsonDocument>();
        // :snippet-start: iterate-asynchronously
        await foreach (var restaurant in query.ToAsyncEnumerable())
        {
            Console.WriteLine(restaurant.ToJson());
            results.Add(restaurant.ToBsonDocument()); // :remove:
        }
        // :snippet-end:
        return results;
    }
}
