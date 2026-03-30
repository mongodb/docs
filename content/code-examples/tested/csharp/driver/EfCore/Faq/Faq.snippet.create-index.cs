public static async Task CreateIndex()
{
    var client = new MongoClient("<connection string>");
    var database = client.GetDatabase("sample_mflix");
    var moviesIndex = new CreateIndexModel<Movie>(Builders<Movie>.IndexKeys
                                .Ascending(x => x.Title)
                                .Ascending(x => x.Genres));
    await database.GetCollection<Movie>("movies")
          .Indexes.CreateOneAsync(moviesIndex);
}
