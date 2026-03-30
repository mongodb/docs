namespace Examples.EfCore.DbContextConcurrency;

using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;

public class Customer
{
    public ObjectId Id { get; set; }
    public string Name { get; set; } = null!;
    public DateTime LastModified { get; set; }
    public byte[] Version { get; set; } = null!;
}

public class ConcurrencyTokenDbContext : DbContext
{
    public ConcurrencyTokenDbContext(DbContextOptions options) : base(options) { }

    // :snippet-start: concurrency-token
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Customer>()
           .Property(p => p.LastModified)
           .IsConcurrencyToken();
    }
    // :snippet-end:
}

public class RowVersionDbContext : DbContext
{
    public RowVersionDbContext(DbContextOptions options) : base(options) { }

    // :snippet-start: row-version
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Customer>()
            .Property(p => p.Version)
            .IsRowVersion();
    }
    // :snippet-end:
}

