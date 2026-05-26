namespace Examples.EfCore.Transactions;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;

public class Planet
{
    public ObjectId Id { get; set; }
    public string Name { get; set; } = null!;
}

public class PlanetDbContext : DbContext
{
    public DbSet<Planet> Planets { get; init; } = null!;

    public static PlanetDbContext Create(IMongoDatabase database) =>
        new(new DbContextOptionsBuilder<PlanetDbContext>()
            .UseMongoDB(database.Client, database.DatabaseNamespace.DatabaseName)
            .ConfigureWarnings(w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning))
            .Options);

    public PlanetDbContext(DbContextOptions options) : base(options) { }
}

public class Transactions
{
    private readonly PlanetDbContext _dbContext;

    public Transactions(string dbName = "test_transactions")
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        var client = new MongoClient(connectionString);
        _dbContext = PlanetDbContext.Create(client.GetDatabase(dbName));
    }

    public void ImplicitTransactionSync()
    {
        var dbContext = _dbContext;

        // :snippet-start: implicit-transaction-sync
        dbContext.Planets.AddRange(
            new Planet { Name = "Mercury" },
            new Planet { Name = "Venus" }
        );

        // Both inserts succeed or both are rolled back
        dbContext.SaveChanges();
        // :snippet-end:
    }

    public async Task ImplicitTransactionAsync()
    {
        var dbContext = _dbContext;

        // :snippet-start: implicit-transaction-async
        dbContext.Planets.AddRange(
            new Planet { Name = "Mercury" },
            new Planet { Name = "Venus" }
        );

        // Both inserts succeed or both are rolled back
        await dbContext.SaveChangesAsync();
        // :snippet-end:
    }

    public void ConfigureAutoTransactionSync()
    {
        var dbContext = _dbContext;

        // :snippet-start: configure-auto-transaction-sync
        dbContext.Database.AutoTransactionBehavior = AutoTransactionBehavior.Never;

        // This SaveChanges() call will not use a transaction
        dbContext.Planets.Add(new Planet { Name = "Mars" });
        dbContext.SaveChanges();
        // :snippet-end:
    }

    public async Task ConfigureAutoTransactionAsync()
    {
        var dbContext = _dbContext;

        // :snippet-start: configure-auto-transaction-async
        dbContext.Database.AutoTransactionBehavior = AutoTransactionBehavior.Never;

        // This SaveChangesAsync() call will not use a transaction
        dbContext.Planets.Add(new Planet { Name = "Mars" });
        await dbContext.SaveChangesAsync();
        // :snippet-end:
    }

    public void ExplicitTransactionSync()
    {
        var dbContext = _dbContext;

        // :snippet-start: explicit-transaction-sync
        using var transaction = dbContext.Database.BeginTransaction();

        var planet = dbContext.Planets.First(p => p.Name == "Mercury");
        planet.Name = "Mercury (Updated)";
        dbContext.SaveChanges();

        dbContext.Planets.Add(new Planet { Name = "Venus" });
        dbContext.SaveChanges();

        transaction.Commit();
        // :snippet-end:
    }

    public async Task ExplicitTransactionAsync()
    {
        var dbContext = _dbContext;

        // :snippet-start: explicit-transaction-async
        await using var transaction = await dbContext.Database.BeginTransactionAsync();

        var planet = await dbContext.Planets.FirstAsync(p => p.Name == "Mercury");
        planet.Name = "Mercury (Updated)";
        await dbContext.SaveChangesAsync();

        dbContext.Planets.Add(new Planet { Name = "Venus" });
        await dbContext.SaveChangesAsync();

        await transaction.CommitAsync();
        // :snippet-end:
    }

    public void TransactionOptionsSync()
    {
        var dbContext = _dbContext;

        // :snippet-start: transaction-options-sync
        var options = new TransactionOptions(
            readConcern: new Optional<ReadConcern>(ReadConcern.Majority)
        );

        using var transaction = dbContext.Database.BeginTransaction(options);

        var planet = dbContext.Planets.First(p => p.Name == "Mercury");
        planet.Name = "Mercury (Updated)";
        dbContext.SaveChanges();

        transaction.Commit();
        // :snippet-end:
    }

    public async Task TransactionOptionsAsync()
    {
        var dbContext = _dbContext;

        // :snippet-start: transaction-options-async
        var options = new TransactionOptions(
            readConcern: new Optional<ReadConcern>(ReadConcern.Majority)
        );

        await using var transaction = await dbContext.Database.BeginTransactionAsync(options);

        var planet = await dbContext.Planets.FirstAsync(p => p.Name == "Mercury");
        planet.Name = "Mercury (Updated)";
        await dbContext.SaveChangesAsync();

        await transaction.CommitAsync();
        // :snippet-end:
    }
}
