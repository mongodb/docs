public static string RunQuickStart()
{
    var connectionString = "<Your connection URI>";
    var client = new MongoClient(connectionString);
    var db = MflixDbContext.Create(client.GetDatabase("sample_mflix"));

    var movie = db.Movies.First(m => m.Title == "Back to the Future");
    return movie.Plot;
}
