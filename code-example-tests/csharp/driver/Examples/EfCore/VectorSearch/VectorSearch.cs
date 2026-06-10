namespace Examples.EfCore.VectorSearch;

using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

// :snippet-start: sample-class
public class Movie
{
    public ObjectId Id { get; set; }
    public string Title { get; set; } = null!;
    public string Plot { get; set; } = null!;
    public float[] PlotEmbedding { get; set; } = null!;
}
// :snippet-end:

// :snippet-start: fluent-model
public class MoviesDbContext : DbContext
{
    public DbSet<Movie> Movies { get; init; } = null!;

    public MoviesDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Movie>(entity =>
        {
            entity.ToCollection("embedded_movies");
            entity.Property(m => m.Title).HasElementName("title");
            entity.Property(m => m.Plot).HasElementName("plot");
            entity.Property(m => m.PlotEmbedding).HasElementName("plot_embedding")
                .HasBinaryVectorDataType(BinaryVectorDataType.Float32);
            entity.HasIndex(m => m.PlotEmbedding, "vector_index")
                .IsVectorIndex(VectorSimilarity.Cosine, 1536);
        });
    }
}
// :snippet-end:

public class VectorSearch
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");

    public List<Movie> RunQuery()
    {
        using var client = new MongoClient(_uri);
        var options = new DbContextOptionsBuilder<MoviesDbContext>()
            .UseMongoDB(client, "sample_mflix")
            .ConfigureWarnings(w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning)) // :remove:
            .Options;

        using var context = new MoviesDbContext(options);

        // :snippet-start: query
        // :uncomment-start:
        //// Replace queryVector with a 1536-dimension embedding vector from your model
        //float[] queryVector = new float[] { 0.1f, -0.2f, 0.3f, ... };
        // :uncomment-end:
        float norm = MathF.Sqrt(1536); // :remove:
        float[] queryVector = Enumerable.Repeat(1.0f / norm, 1536).ToArray(); // :remove:
        var results = context.Movies
            .VectorSearch(m => m.PlotEmbedding, queryVector, limit: 10)
            .ToList();
        // :snippet-end:

        return results;
    }
}
