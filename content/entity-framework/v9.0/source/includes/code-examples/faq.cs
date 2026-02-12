// start-create-index
using MongoDB.Driver;

var client = new MongoClient("<connection string>");
var database = client.GetDatabase("sample_mflix");
await CreateIndexesAsync(database);

async Task CreateIndexesAsync(IMongoDatabase database)
{
    var moviesIndex = new CreateIndexModel<Movie>(Builders<Movie>.IndexKeys
                                .Ascending(x => x.Title)
                                .Ascending(x => x.Genres));
    await database.GetCollection<Movie>("movies")
          .Indexes.CreateOneAsync(moviesIndex);
}
// end-create-index

// start-atlas-search
// Client used to set up your DbContext 
var client = new MongoClient("<connection string>");

var clientDB = client.GetDatabase("sample_guides");
var collection = clientDB.GetCollection<Planet>("planets");

var searchResult = collection.Aggregate()
    .Search(Builders<Planet>.Search.Equals(p => p.hasRings, true))
    .ToList();

foreach (var p in searchResult)
{
    Console.WriteLine(p.name);
}
// end-atlas-search