namespace Examples.EfCore.Indexes;

using Examples.EfCore.QuickReference;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

public class IndexDbContext : DbContext
{
    public DbSet<Planet> Planets { get; init; } = null!;

    public IndexDbContext(DbContextOptions options) : base(options) { }

    // :snippet-start: model-creating
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Paste example code here

    }
    // :snippet-end:
}

public class Indexes
{
    public static void SingleFieldIndex(ModelBuilder modelBuilder)
    {
        // :snippet-start: single-field-index
        modelBuilder.Entity<Planet>(p =>
        {
            p.HasIndex(p => p.orderFromSun);
            p.ToCollection("planets");
        });
        // :snippet-end:
    }

    public static void CompoundIndex(ModelBuilder modelBuilder)
    {
        // :snippet-start: compound-index
        modelBuilder.Entity<Planet>(p =>
        {
            p.HasIndex(p => new { p.orderFromSun, p.name });
            p.ToCollection("planets");
        });
        // :snippet-end:
    }

    public static void UniqueIndex(ModelBuilder modelBuilder)
    {
        // :snippet-start: unique-index
        modelBuilder.Entity<Planet>(p =>
        {
            p.HasIndex(p => p.orderFromSun).IsUnique();
            p.ToCollection("planets");
        });
        // :snippet-end:
    }

    public static void DescendingIndex(ModelBuilder modelBuilder)
    {
        // :snippet-start: descending-index
        modelBuilder.Entity<Planet>(p =>
        {
            p.HasIndex(p => p.orderFromSun).IsDescending();
            p.ToCollection("planets");
        });
        // :snippet-end:
    }

    public static void NamedIndex(ModelBuilder modelBuilder)
    {
        // :snippet-start: named-index
        modelBuilder.Entity<Planet>(p =>
        {
            p.HasIndex(p => new { p.orderFromSun, p.name }, "named_order");
            p.ToCollection("planets");
        });
        // :snippet-end:
    }

    public static void SparseIndex(ModelBuilder modelBuilder)
    {
        // :snippet-start: sparse-index
        modelBuilder.Entity<Planet>(p =>
        {
            p.HasIndex(p => p.orderFromSun)
                .HasCreateIndexOptions(new CreateIndexOptions() { Sparse = true });
            p.ToCollection("planets");
        });
        // :snippet-end:
    }

    public static void AlternateKey(ModelBuilder modelBuilder)
    {
        // :snippet-start: alternate-key
        modelBuilder.Entity<Planet>(p =>
        {
            p.HasAlternateKey(p => p.name);
            p.ToCollection("planets");
        });
        // :snippet-end:
    }

    public static void CompositeAlternateKey(ModelBuilder modelBuilder)
    {
        // :snippet-start: composite-alternate-key
        modelBuilder.Entity<Planet>(p =>
        {
            p.HasAlternateKey(p => new { p.name, p.orderFromSun });
            p.ToCollection("planets");
        });
        // :snippet-end:
    }
}

