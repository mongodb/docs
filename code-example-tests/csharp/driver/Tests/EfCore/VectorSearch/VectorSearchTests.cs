namespace Tests.EfCore.VectorSearch;

using Examples.EfCore.VectorSearch;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore;
using Utilities.Comparison;
using Utilities.SampleData;
using Utilities.SearchIndex;

[TestFixture]
public class VectorSearchTests
{
    [OneTimeSetUp]
    [RequiresSampleData("sample_mflix", new[] { "embedded_movies" })]
    public static async Task CreateVectorIndex()
    {
        DotNetEnv.Env.TraversePath().Load();
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING", "");
        if (string.IsNullOrEmpty(connectionString))
        {
            Assert.Ignore("CONNECTION_STRING is not set. Skipping vector search tests.");
            return;
        }

        var client = new MongoClient(connectionString);
        var options = new DbContextOptionsBuilder<MoviesDbContext>()
            .UseMongoDB(client, "sample_mflix")
            .ConfigureWarnings(w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning))
            .Options;

        using var db = new MoviesDbContext(options);
        try
        {
            await db.Database.CreateMissingVectorIndexesAsync();
            await db.Database.WaitForVectorIndexesAsync(timeout: TimeSpan.FromMinutes(2));
        }
        catch (MongoCommandException ex)
        {
            Assert.Ignore(
                $"Environment does not support Atlas Search indexes. Skipping all tests. Error: {ex.Message}");
        }
        catch (TimeoutException ex)
        {
            Assert.Ignore(
                $"Vector index not ready within timeout. Skipping all tests. Error: {ex.Message}");
        }
    }

    private static string FullPath(string filename) =>
        Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "..", "..", "Examples", "EfCore", "VectorSearch", "OutputFiles", filename);

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "embedded_movies" })]
    [RequiresSearchIndex("vector_index", IndexType = "vectorSearch")]
    [Description("Verifies that VectorSearch returns the expected movies in ranked order.")]
    public void TestVectorSearch()
    {
        var results = new VectorSearch().RunQuery();

        Expect.That(results)
            .WithIgnoredFields("PlotEmbedding")
            .WithOrderedSort()
            .ShouldMatch(FullPath("VectorSearchOutput.txt"));
    }
}
