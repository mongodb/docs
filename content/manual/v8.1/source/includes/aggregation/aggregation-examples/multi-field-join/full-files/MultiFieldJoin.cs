using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

class MultiFieldJoin
{
  public void PerformMultiFieldJoin()
  {

    var uri = "<connection string>";
    var client = new MongoClient(uri);
    var aggDB = client.GetDatabase("agg_tutorials_db");

    // start-insert-sample-data
    var products = aggDB.GetCollection<Product>("products");
    var orders = aggDB.GetCollection<Order>("orders");
    products.DeleteMany(Builders<Product>.Filter.Empty);
    orders.DeleteMany(Builders<Order>.Filter.Empty);

    products.InsertMany(new List<Product>
    {
        new Product
        {
            Name = "Asus Laptop",
            Variation = "Ultra HD",
            Category = "ELECTRONICS",
            Description = "Great for watching movies"
        },
        new Product
        {
            Name = "Asus Laptop",
            Variation = "Standard Display",
            Category = "ELECTRONICS",
            Description = "Good value laptop for students"
        },
        new Product
        {
            Name = "The Day Of The Triffids",
            Variation = "1st Edition",
            Category = "BOOKS",
            Description = "Classic post-apocalyptic novel"
        },
        new Product
        {
            Name = "The Day Of The Triffids",
            Variation = "2nd Edition",
            Category = "BOOKS",
            Description = "Classic post-apocalyptic novel"
        },
        new Product
        {
            Name = "Morphy Richards Food Mixer",
            Variation = "Deluxe",
            Category = "KITCHENWARE",
            Description = "Luxury mixer turning good cakes into great"
        }
    });

    orders.InsertMany(new List<Order>
    {
        new Order
        {
            CustomerId = "elise_smith@myemail.com",
            OrderDate = DateTime.Parse("2020-05-30T08:35:52Z"),
            ProductName = "Asus Laptop",
            ProductVariation = "Standard Display",
            Value = 431.43
        },
        new Order
        {
            CustomerId = "tj@wheresmyemail.com",
            OrderDate = DateTime.Parse("2019-05-28T19:13:32Z"),
            ProductName = "The Day Of The Triffids",
            ProductVariation = "2nd Edition",
            Value = 5.01
        },
        new Order
        {
            CustomerId = "oranieri@warmmail.com",
            OrderDate = DateTime.Parse("2020-01-01T08:25:37Z"),
            ProductName = "Morphy Richards Food Mixer",
            ProductVariation = "Deluxe",
            Value = 63.13
        },
        new Order
        {
            CustomerId = "jjones@tepidmail.com",
            OrderDate = DateTime.Parse("2020-12-26T08:55:46Z"),
            ProductName = "Asus Laptop",
            ProductVariation = "Standard Display",
            Value = 429.65
        }
    });
    // end-insert-sample-data

    // start-embedded-pl-match1
    var embeddedPipeline = new EmptyPipelineDefinition<Order>()
        .Match(new BsonDocument("$expr",
            new BsonDocument("$and", new BsonArray
            {
                    new BsonDocument("$eq", new BsonArray { "$ProductName", "$$prdname" }),
                    new BsonDocument("$eq", new BsonArray { "$ProductVariation", "$$prdvartn" })
            })))
        // end-embedded-pl-match1
        // start-embedded-pl-match2
        .Match(o => o.OrderDate >= DateTime.Parse("2020-01-01T00:00:00Z") &&
                    o.OrderDate < DateTime.Parse("2021-01-01T00:00:00Z"))
        // end-embedded-pl-match2
        // start-embedded-pl-project
        .Project(Builders<Order>.Projection
                .Exclude(o => o.Id)
                .Exclude(o => o.ProductName)
                .Exclude(o => o.ProductVariation));
    // end-embedded-pl-project

    // start-lookup
    var results = products.Aggregate()
        .Lookup<Order, BsonDocument, IEnumerable<BsonDocument>, BsonDocument>(
            foreignCollection: orders,
            let: new BsonDocument { { "prdname", "$Name" }, { "prdvartn", "$Variation" } },
            lookupPipeline: embeddedPipeline,
            "Orders"
        )
        // end-lookup
        // start-match
        .Match(Builders<BsonDocument>.Filter.Ne("Orders", new BsonArray()))
        // end-match
        // start-project
        .Project(Builders<BsonDocument>.Projection
            .Exclude("_id")
            .Exclude("Description")
        );
    // end-project

    foreach (var result in results.ToList())
    {
      Console.WriteLine(result);
    }
  }
}

// start-pocos
public class Product
{
  [BsonId]
  public ObjectId Id { get; set; }
  public string Name { get; set; }
  public string Variation { get; set; }
  public string Category { get; set; }
  public string Description { get; set; }
}

public class Order
{
  [BsonId]
  public ObjectId Id { get; set; }
  public string CustomerId { get; set; }
  public DateTime OrderDate { get; set; }
  public string ProductName { get; set; }
  public string ProductVariation { get; set; }
  public double Value { get; set; }
}
// end-pocos
