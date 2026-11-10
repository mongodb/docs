using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

class OneToOneJoin
{
  public void PerformOneToOneJoin()
  {
    var uri = "<connection string>";
    var client = new MongoClient(uri);
    var aggDB = client.GetDatabase("agg_tutorials_db");

    // start-insert-sample-data
    var orders = aggDB.GetCollection<Order>("orders");
    var products = aggDB.GetCollection<Product>("products");
    orders.DeleteMany(Builders<Order>.Filter.Empty);
    products.DeleteMany(Builders<Product>.Filter.Empty);

    orders.InsertMany(new List<Order>
    {
        new Order
        {
            CustomerId = "elise_smith@myemail.com",
            OrderDate = DateTime.Parse("2020-05-30T08:35:52Z"),
            ProductId = "a1b2c3d4",
            Value = 431.43
        },
        new Order
        {
            CustomerId = "tj@wheresmyemail.com",
            OrderDate = DateTime.Parse("2019-05-28T19:13:32Z"),
            ProductId = "z9y8x7w6",
            Value = 5.01
        },
        new Order
        {
            CustomerId = "oranieri@warmmail.com",
            OrderDate = DateTime.Parse("2020-01-01T08:25:37Z"),
            ProductId = "ff11gg22hh33",
            Value = 63.13
        },
        new Order
        {
            CustomerId = "jjones@tepidmail.com",
            OrderDate = DateTime.Parse("2020-12-26T08:55:46Z"),
            ProductId = "a1b2c3d4",
            Value = 429.65
        }
    });

    products.InsertMany(new List<Product>
    {
        new Product
        {
            Id = "a1b2c3d4",
            Name = "Asus Laptop",
            Category = "ELECTRONICS",
            Description = "Good value laptop for students"
        },
        new Product
        {
            Id = "z9y8x7w6",
            Name = "The Day Of The Triffids",
            Category = "BOOKS",
            Description = "Classic post-apocalyptic novel"
        },
        new Product
        {
            Id = "ff11gg22hh33",
            Name = "Morphy Richardds Food Mixer",
            Category = "KITCHENWARE",
            Description = "Luxury mixer turning good cakes into great"
        },
        new Product
        {
            Id = "pqr678st",
            Name = "Karcher Hose Set",
            Category = "GARDEN",
            Description = "Hose + nosels + winder for tidy storage"
        }
    });
    // end-insert-sample-data

    // start-match
    var results = orders.Aggregate()
        .Match(o => o.OrderDate >= DateTime.Parse("2020-01-01T00:00:00Z") &&
                    o.OrderDate < DateTime.Parse("2021-01-01T00:00:00Z"))
        // end-match
        // start-lookup
        .Lookup<Product, Order>(
            foreignCollectionName: "products",
            localField: "ProductId",
            foreignField: "Id",
            @as: "ProductMapping"
        )
        // end-lookup
        // start-project
        .Project(new BsonDocument
            {
                { "ProductName", new BsonDocument("$first", "$ProductMapping.Name") },
                { "ProductCategory", new BsonDocument("$first", "$ProductMapping.Category") },
                { "OrderDate", 1 },
                { "CustomerId", 1 },
                { "Value", 1 },
                { "_id", 0 },
            });
    // end-project

    foreach (var result in results.ToList())
    {
      Console.WriteLine(result);
    }
  }
}

// start-pocos
public class Order
{
  [BsonId]
  public ObjectId Id { get; set; }
  public string CustomerId { get; set; }
  public DateTime OrderDate { get; set; }
  public string ProductId { get; set; }
  public double Value { get; set; }
}

public class Product
{
  [BsonId]
  public string Id { get; set; }
  public string Name { get; set; }
  public string Category { get; set; }
  public string Description { get; set; }
}
// end-pocos
