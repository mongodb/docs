namespace Examples.EfCore.Relationships;

using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.EntityFrameworkCore.Extensions;

// :snippet-start: single-owned-entity
[Owned]
public class Address
{
    public string Street { get; set; } = null!;
    public string City { get; set; } = null!;
    public string Country { get; set; } = null!;
}

public class Customer
{
    public ObjectId Id { get; set; }
    public string Name { get; set; } = null!;
    public Address Address { get; set; } = null!;
}
// :snippet-end:

// :snippet-start: single-owned-fluent
public class CustomerDbContext : DbContext
{
    public DbSet<Customer> Customers { get; set; } = null!;

    public CustomerDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Customer>(c =>
        {
            c.OwnsOne(c => c.Address);
            c.ToCollection("customers");
        });
    }
}
// :snippet-end:

// :snippet-start: many-owned-entity
[Owned]
public class Order
{
    public string Product { get; set; } = null!;
    public int Quantity { get; set; }
}

public class CustomerWithOrders
{
    public ObjectId Id { get; set; }
    public string Name { get; set; } = null!;
    public List<Order> Orders { get; set; } = new();
}
// :snippet-end:

// :snippet-start: many-owned-fluent
public class OrderDbContext : DbContext
{
    public DbSet<CustomerWithOrders> Customers { get; set; } = null!;

    public OrderDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<CustomerWithOrders>(c =>
        {
            c.OwnsMany(c => c.Orders);
            c.ToCollection("customers");
        });
    }
}
// :snippet-end:

// :snippet-start: manual-reference
public class Author
{
    public ObjectId Id { get; set; }
    public string Name { get; set; } = null!;
}

public class Book
{
    public ObjectId Id { get; set; }
    public string Title { get; set; } = null!;

    // Store reference to Author by storing the Author's Id
    public ObjectId AuthorId { get; set; }
}
// :snippet-end:

public class BookDbContext : DbContext
{
    public DbSet<Author> Authors { get; set; } = null!;
    public DbSet<Book> Books { get; set; } = null!;

    public BookDbContext(DbContextOptions options) : base(options) { }
}

public class Relationships
{
    public static (Book?, Author?) QueryBookAndAuthor(BookDbContext db)
    {
        // :snippet-start: query-reference
        // Query a book and its author
        var book = db.Books.FirstOrDefault(b => b.Title == "My Book");
        var author = db.Authors.FirstOrDefault(a => a.Id == book!.AuthorId);
        // :snippet-end:
        return (book, author);
    }
}

