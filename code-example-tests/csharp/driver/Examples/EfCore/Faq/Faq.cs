// :replace-start: {
//   "terms": {
//     "DotNetEnv.Env.GetString(\"CONNECTION_STRING\")": "\"<connection string>\""
//   }
// }
namespace Examples.EfCore.Faq;

using Examples.EfCore.QuickReference;
using MongoDB.Driver;

public class Movie
{
    public string Title { get; set; } = null!;
    public List<string> Genres { get; set; } = null!;
}

public class Faq
{
    // :snippet-start: create-index
    public static async Task CreateIndex()
    {
        var client = new MongoClient(DotNetEnv.Env.GetString("CONNECTION_STRING"));
        var database = client.GetDatabase("sample_mflix");
        var moviesIndex = new CreateIndexModel<Movie>(Builders<Movie>.IndexKeys
                                    .Ascending(x => x.Title)
                                    .Ascending(x => x.Genres));
        await database.GetCollection<Movie>("movies")
              .Indexes.CreateOneAsync(moviesIndex);
    }
    // :snippet-end:

    // :snippet-start: atlas-search
    public static void AtlasSearch()
    {
        // Client used to set up your DbContext
        var client = new MongoClient(DotNetEnv.Env.GetString("CONNECTION_STRING"));

        var clientDB = client.GetDatabase("sample_guides");
        var collection = clientDB.GetCollection<Planet>("planets");

        var searchResult = collection.Aggregate()
            .Search(Builders<Planet>.Search.Equals(p => p.hasRings, true))
            .ToList();

        foreach (var p in searchResult)
        {
            Console.WriteLine(p.name);
        }
    }
    // :snippet-end:
}
// :replace-end:

