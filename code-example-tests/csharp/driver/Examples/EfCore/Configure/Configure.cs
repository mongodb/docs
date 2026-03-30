// :replace-start: {
//   "terms": {
//     "DotNetEnv.Env.GetString(\"CONNECTION_STRING\")": "\"<Your MongoDB Connection URI>\"",
//     "\"sample_guides\"": "\"<database name>\""
//   }
// }
namespace Examples.EfCore.Configure;

using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

// :snippet-start: customer
public class Customer
{
    public ObjectId Id { get; set; }
    public string Name { get; set; } = null!;
    public string Order { get; set; } = null!;
}
// :snippet-end:

// :snippet-start: my-db-context
public class MyDbContext : DbContext
{
    public DbSet<Customer> Customers { get; init; } = null!;

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
// :snippet-end:

public class Configure
{
    public static MyDbContext UseMongoDB()
    {
        // :snippet-start: use-mongodb
        var mongoClient = new MongoClient(DotNetEnv.Env.GetString("CONNECTION_STRING"));

        var dbContextOptions =
            new DbContextOptionsBuilder<MyDbContext>().UseMongoDB(mongoClient, "sample_guides");

        var db = new MyDbContext(dbContextOptions.Options);
        // :snippet-end:
        return db;
    }

    public static void ConfigureEFProvider()
    {
        // :snippet-start: configure-ef-provider
        var mongoClient = new MongoClient(DotNetEnv.Env.GetString("CONNECTION_STRING"));

        var dbContextOptions =
            new DbContextOptionsBuilder<MyDbContext>().UseMongoDB(mongoClient, "sample_guides");

        var db = new MyDbContext(dbContextOptions.Options);

        // Add a new customer and save it to the database
        db.Customers.Add(new Customer() { Name = "John Doe", Order = "1 Green Tea" });
        db.SaveChanges();
        // :snippet-end:
    }
}
// :replace-end:

