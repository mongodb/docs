//	:replace-start: {
//	  "terms": {
//	    "_orders": "orders",
//	    "_products": "products",
//      "_aggDB": "aggDB"
//	  }
//	}

using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.Aggregation.Pipelines.JoinMultiField;

public class Tutorial
{
    private IMongoDatabase? _aggDB;
    private IMongoCollection<Order>? _orders;
    private IMongoCollection<Product>? _products;

    public void LoadSampleData()
    {
        var uri = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        var client = new MongoClient(uri);
        _aggDB = client.GetDatabase("agg_tutorials_db");
        _orders = _aggDB.GetCollection<Order>("orders");
        _products = _aggDB.GetCollection<Product>("products");

        // :snippet-start: load-sample-data
        // :uncomment-start:
        //var _orders = _aggDB.GetCollection<Order>("orders");
        //var _products = _aggDB.GetCollection<Product>("products");
        // :uncomment-end:

        _products.InsertMany(new List<Product>
        {
            new Product()
            {
                Name = "Asus Laptop",
                Variation = "Ultra HD",
                Category = "ELECTRONICS",
                Description = "Great for watching movies"
            },
            new Product()
            {
                Name = "Asus Laptop",
                Variation = "Standard Display",
                Category = "ELECTRONICS",
                Description = "Good value laptop for students"
            },
            new Product()
            {
                Name = "The Day Of The Triffids",
                Variation = "1st Edition",
                Category = "BOOKS",
                Description = "Classic post-apocalyptic novel"
            },
            new Product()
            {
                Name = "The Day Of The Triffids",
                Variation = "2nd Edition",
                Category = "BOOKS",
                Description = "Classic post-apocalyptic novel"
            },
            new Product()
            {
                Name = "Morphy Richards Food Mixer",
                Variation = "Deluxe",
                Category = "KITCHENWARE",
                Description = "Luxury mixer turning good cakes into great"
            }
        });

        _orders.InsertMany(new List<Order>
        {
            new Order()
            {
                CustomerId = "elise_smith@myemail.com",
                OrderDate = DateTime.Parse("2020-05-30T08:35:52Z"),
                ProductName = "Asus Laptop",
                ProductVariation = "Standard Display",
                Value = 431.43
            },
            new Order()
            {
                CustomerId = "tj@wheresmyemail.com",
                OrderDate = DateTime.Parse("2019-05-28T19:13:32Z"),
                ProductName = "The Day Of The Triffids",
                ProductVariation = "2nd Edition",
                Value = 5.01
            },
            new Order()
            {
                CustomerId = "oranieri@warmmail.com",
                OrderDate = DateTime.Parse("2020-01-01T08:25:37Z"),
                ProductName = "Morphy Richards Food Mixer",
                ProductVariation = "Deluxe",
                Value = 63.13
            },
            new Order()
            {
                CustomerId = "jjones@tepidmail.com",
                OrderDate = DateTime.Parse("2020-12-26T08:55:46Z"),
                ProductName = "Asus Laptop",
                ProductVariation = "Standard Display",
                Value = 429.65
            }
        });
        // :snippet-end:
    }

    public List<BsonDocument> PerformAggregation()
    {
        if (_aggDB == null || _orders == null)
            throw new InvalidOperationException("You must call LoadSampleData before performing aggregation.");

        // :snippet-start: embedded-pl-match-name-variation
        var embeddedPipeline = new EmptyPipelineDefinition<Order>()
            .Match(new BsonDocument("$expr",
                new BsonDocument("$and", new BsonArray
                {
                    new BsonDocument("$eq", new BsonArray { "$ProductName", "$$prdname" }),
                    new BsonDocument("$eq", new BsonArray { "$ProductVariation", "$$prdvartn" })
                })))
            // :snippet-end:
            // :snippet-start: embedded-pl-match-order-date
            .Match(o => o.OrderDate >= DateTime.Parse("2020-01-01T00:00:00Z") &&
                        o.OrderDate < DateTime.Parse("2021-01-01T00:00:00Z"))
            // :snippet-end:
            // :snippet-start: embedded-pl-project
            .Project(Builders<Order>.Projection
                .Exclude(o => o.Id)
                .Exclude(o => o.ProductName)
                .Exclude(o => o.ProductVariation));
        // :snippet-end:

        // :snippet-start: lookup
        var results = _products.Aggregate()
            .Lookup<Order, BsonDocument, IEnumerable<BsonDocument>, BsonDocument>(
                foreignCollection: _orders,
                let: new BsonDocument { { "prdname", "$Name" }, { "prdvartn", "$Variation" } },
                lookupPipeline: embeddedPipeline,
                "Orders"
            )
            // :snippet-end:
            // :snippet-start: match
            .Match(Builders<BsonDocument>.Filter.Ne("Orders", new BsonArray()))
            // :snippet-end:
            // :snippet-start: project
            .Project(Builders<BsonDocument>.Projection
                .Exclude("_id")
                .Exclude("Description")
            );
        // :snippet-end:
        return results.ToList();
    }
}
// :replace-end: