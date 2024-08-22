using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");

if (connectionString == null)
{
    Console.WriteLine("You must set your 'MONGODB_URI' environment variable. To learn how to set it, see https://www.mongodb.com/docs/drivers/csharp/current/quick-start/#set-your-connection-string");
    Environment.Exit(0);
}
var client = new MongoClient(connectionString);
var db = MflixDbContext.Create(client.GetDatabase("sample_mflix"));
db.Database.EnsureCreated();

var movie = db.Movies.First(m => m.Title == "Back to the Future");
Console.WriteLine(movie.Plot);

internal class MflixDbContext : DbContext
{
    public DbSet<Movie> Movies { get; init; }

    public static MflixDbContext Create(IMongoDatabase database) =>
        new(new DbContextOptionsBuilder<MflixDbContext>()
            .UseMongoDB(database.Client, database.DatabaseNamespace.DatabaseName)
            .Options);

    public MflixDbContext(DbContextOptions options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Movie>().ToCollection("movies");
    }
}

internal class Movie
{
    [BsonId]
    public ObjectId _id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; }

    [BsonElement("rated")]
    public string Rated { get; set; }

    [BsonElement("plot")]
    public string Plot { get; set; }
}