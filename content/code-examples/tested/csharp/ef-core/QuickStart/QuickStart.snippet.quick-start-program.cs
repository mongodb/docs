using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

var connectionString = "<Your connection URI>";
var client = new MongoClient(connectionString);
var db = MflixDbContext.Create(client.GetDatabase("sample_mflix"));

var movie = db.Movies.First(m => m.Title == "Back to the Future");
Console.WriteLine(movie.Plot);

public class MflixDbContext : DbContext
{
    public DbSet<Movie> Movies { get; init; } = null!;

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

public class Movie
{
    [BsonId]
    public ObjectId _id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; } = null!;

    [BsonElement("rated")]
    public string Rated { get; set; } = null!;

    [BsonElement("plot")]
    public string Plot { get; set; } = null!;
}
