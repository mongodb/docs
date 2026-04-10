namespace Tests.EfCore.Indexes;

using Examples.EfCore.Indexes;
using Examples.EfCore.QueryData;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using MongoDB.Driver;
using Utilities.Comparison;

// Helper DbContext that delegates OnModelCreating to a provided Action
internal class TestIndexDbContext(DbContextOptions options, Action<ModelBuilder> configure) : DbContext(options)
{
    public DbSet<Planet> Planets { get; init; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        configure(modelBuilder);
    }
}

[TestFixture]
public class IndexesTests
{
    private IMongoClient _client = null!;
    private const string DbName = "test_indexes";

    [SetUp]
    public void SetUp()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        _client = new MongoClient(connectionString);
    }

    [TearDown]
    public void TearDown()
    {
        _client.DropDatabase(DbName);
        _client.Dispose();
    }

    private TestIndexDbContext CreateContext(Action<ModelBuilder> configure)
    {
        var options = new DbContextOptionsBuilder<TestIndexDbContext>()
            .UseMongoDB(_client, DbName)
            .ConfigureWarnings(w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning))
            .Options;
        return new TestIndexDbContext(options, configure);
    }

    [Test]
    [Description("Verifies that SingleFieldIndex configures without error.")]
    public void TestSingleFieldIndex()
    {
        using var db = CreateContext(Indexes.SingleFieldIndex);
        Expect.That(db.Model.FindEntityType(typeof(Planet))?.ShortName()).ShouldMatch("Planet");
    }

    [Test]
    [Description("Verifies that CompoundIndex configures without error.")]
    public void TestCompoundIndex()
    {
        using var db = CreateContext(Indexes.CompoundIndex);
        Expect.That(db.Model.FindEntityType(typeof(Planet))?.ShortName()).ShouldMatch("Planet");
    }

    [Test]
    [Description("Verifies that UniqueIndex configures without error.")]
    public void TestUniqueIndex()
    {
        using var db = CreateContext(Indexes.UniqueIndex);
        Expect.That(db.Model.FindEntityType(typeof(Planet))?.ShortName()).ShouldMatch("Planet");
    }

    [Test]
    [Description("Verifies that DescendingIndex configures without error.")]
    public void TestDescendingIndex()
    {
        using var db = CreateContext(Indexes.DescendingIndex);
        Expect.That(db.Model.FindEntityType(typeof(Planet))?.ShortName()).ShouldMatch("Planet");
    }

    [Test]
    [Description("Verifies that NamedIndex configures without error.")]
    public void TestNamedIndex()
    {
        using var db = CreateContext(Indexes.NamedIndex);
        Expect.That(db.Model.FindEntityType(typeof(Planet))?.ShortName()).ShouldMatch("Planet");
    }

    [Test]
    [Description("Verifies that SparseIndex configures without error.")]
    public void TestSparseIndex()
    {
        using var db = CreateContext(Indexes.SparseIndex);
        Expect.That(db.Model.FindEntityType(typeof(Planet))?.ShortName()).ShouldMatch("Planet");
    }

    [Test]
    [Description("Verifies that AlternateKey configures without error.")]
    public void TestAlternateKey()
    {
        using var db = CreateContext(Indexes.AlternateKey);
        Expect.That(db.Model.FindEntityType(typeof(Planet))?.ShortName()).ShouldMatch("Planet");
    }

    [Test]
    [Description("Verifies that CompositeAlternateKey configures without error.")]
    public void TestCompositeAlternateKey()
    {
        using var db = CreateContext(Indexes.CompositeAlternateKey);
        Expect.That(db.Model.FindEntityType(typeof(Planet))?.ShortName()).ShouldMatch("Planet");
    }
}

