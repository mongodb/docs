namespace Tests.EfCore.Relationships;

using Examples.EfCore.Relationships;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

// We create test data inline in each test rather than using the Atlas sample dataset
// because these tests perform write operations that would corrupt shared sample data.
[TestFixture]
public class RelationshipsTests
{
    private IMongoClient _client = null!;
    private IMongoDatabase _database = null!;
    private const string DbName = "test_relationships";

    [SetUp]
    public void SetUp()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        _client = new MongoClient(connectionString);
        _database = _client.GetDatabase(DbName);
    }

    [TearDown]
    public void TearDown()
    {
        _client.DropDatabase(DbName);
        _client.Dispose();
    }

    [Test]
    [Description("Verifies that a Customer with a single owned Address entity can be saved and retrieved.")]
    public void TestSingleOwnedEntity()
    {
        var db = CreateCustomerDbContext();
        db.Customers.Add(new Customer
        {
            Name = "John Doe",
            Address = new Address { Street = "123 Main St", City = "New York", Country = "USA" }
        });
        db.SaveChanges();

        var db2 = CreateCustomerDbContext();
        var customer = db2.Customers.FirstOrDefault(c => c.Name == "John Doe");
        Expect.That(customer?.Address?.City).ShouldMatch("New York");
    }

    [Test]
    [Description("Verifies that a Customer with multiple owned Order entities can be saved and retrieved.")]
    public void TestManyOwnedEntities()
    {
        var db = CreateOrderDbContext();
        db.Customers.Add(new CustomerWithOrders
        {
            Name = "Jane Smith",
            Orders = new List<Order>
            {
                new() { Product = "Laptop", Quantity = 1 },
                new() { Product = "Mouse", Quantity = 2 }
            }
        });
        db.SaveChanges();

        var db2 = CreateOrderDbContext();
        var customer = db2.Customers.FirstOrDefault(c => c.Name == "Jane Smith");
        Expect.That(customer?.Orders.Count).ShouldMatch(2);
    }

    [Test]
    [Description("Verifies that a Book can reference an Author by ID and both can be retrieved.")]
    public void TestManualReference()
    {
        var authorId = ObjectId.GenerateNewId();
        var db = CreateBookDbContext();
        db.Authors.Add(new Author { Id = authorId, Name = "Jane Austen" });
        db.Books.Add(new Book { Title = "My Book", AuthorId = authorId });
        db.SaveChanges();

        var db2 = CreateBookDbContext();
        var (book, author) = Relationships.QueryBookAndAuthor(db2);
        Expect.That(book?.Title).ShouldMatch("My Book");
        Expect.That(author?.Name).ShouldMatch("Jane Austen");
    }

    private CustomerDbContext CreateCustomerDbContext() =>
        new(new DbContextOptionsBuilder<CustomerDbContext>()
            .UseMongoDB(_database.Client, DbName)
            .ConfigureWarnings(w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning))
            .Options);

    private OrderDbContext CreateOrderDbContext() =>
        new(new DbContextOptionsBuilder<OrderDbContext>()
            .UseMongoDB(_database.Client, DbName)
            .ConfigureWarnings(w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning))
            .Options);

    private BookDbContext CreateBookDbContext() =>
        new(new DbContextOptionsBuilder<BookDbContext>()
            .UseMongoDB(_database.Client, DbName)
            .ConfigureWarnings(w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning))
            .Options);
}

