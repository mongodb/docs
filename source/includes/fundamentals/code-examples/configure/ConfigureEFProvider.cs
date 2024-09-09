using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using MongoDB.EntityFrameworkCore.Extensions;

var mongoClient = new MongoClient("<Your MongoDB Connection URI>");

var dbContextOptions =
    new DbContextOptionsBuilder<MyDbContext>().UseMongoDB(mongoClient, "<Database Name>");

var db = new MyDbContext(dbContextOptions.Options);
db.Database.EnsureCreated();

// Add a new customer and save it to the database
db.Customers.Add(new Customer() { name = "John Doe", Order = "1 Green Tea" });
db.SaveChanges();

public class Customer
{
    public ObjectId Id { get; set; }
    public String Name { get; set; }
    public String Order { get; set; }
}

public class MyDbContext : DbContext
{
    public DbSet<Customer> Customers { get; init; }

    public MyDbContext(DbContextOptions options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Customer>().ToCollection("customers");
    }
}