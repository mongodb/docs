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