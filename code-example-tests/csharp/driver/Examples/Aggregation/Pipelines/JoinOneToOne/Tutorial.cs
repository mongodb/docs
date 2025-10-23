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

namespace Examples.Aggregation.Pipelines.JoinOneToOne;

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
        // :snippet-start: load-sample-data
        // :uncomment-start:
        //var _orders = _aggDB.GetCollection<Order>("orders");
        //var _products = _aggDB.GetCollection<Product>("products");
        // :uncomment-end:

        _orders = _aggDB.GetCollection<Order>("orders");
        _products = _aggDB.GetCollection<Product>("products");

        _orders.InsertMany(new List<Order>
        {
            new Order()
            {
                CustomerId = "elise_smith@myemail.com",
                OrderDate = DateTime.Parse("2020-05-30T08:35:52Z"),
                ProductId = "a1b2c3d4",
                Value = 431.43
            },
            new Order()
            {
                CustomerId = "tj@wheresmyemail.com",
                OrderDate = DateTime.Parse("2019-05-28T19:13:32Z"),
                ProductId = "z9y8x7w6",
                Value = 5.01
            },
            new Order()
            {
                CustomerId = "oranieri@warmmail.com",
                OrderDate = DateTime.Parse("2020-01-01T08:25:37Z"),
                ProductId = "ff11gg22hh33",
                Value = 63.13
            },
            new Order()
            {
                CustomerId = "jjones@tepidmail.com",
                OrderDate = DateTime.Parse("2020-12-26T08:55:46Z"),
                ProductId = "a1b2c3d4",
                Value = 429.65
            }
        });

        _products.InsertMany(new List<Product>
        {
            new Product()
            {
                Id = "a1b2c3d4",
                Name = "Asus Laptop",
                Category = "ELECTRONICS",
                Description = "Good value laptop for students"
            },
            new Product()
            {
                Id = "z9y8x7w6",
                Name = "The Day Of The Triffids",
                Category = "BOOKS",
                Description = "Classic post-apocalyptic novel"
            },
            new Product()
            {
                Id = "ff11gg22hh33",
                Name = "Morphy Richardds Food Mixer",
                Category = "KITCHENWARE",
                Description = "Luxury mixer turning good cakes into great"
            },
            new Product()
            {
                Id = "pqr678st",
                Name = "Karcher Hose Set",
                Category = "GARDEN",
                Description = "Hose + nozzles + winder for tidy storage"
            }
        });
        // :snippet-end:
    }

    public List<BsonDocument> PerformAggregation()
    {
        if (_aggDB == null || _orders == null)
            throw new InvalidOperationException("You must call LoadSampleData before performing aggregation.");

        // :snippet-start: match
        var results = _orders.Aggregate()
            .Match(o => o.OrderDate >= DateTime.Parse("2020-01-01T00:00:00Z") &&
                        o.OrderDate < DateTime.Parse("2021-01-01T00:00:00Z"))
            // :snippet-end:
            // :snippet-start: lookup
            .Lookup<Product, Order>(
                foreignCollectionName: "products",
                localField: "ProductId",
                foreignField: "Id",
                "ProductMapping"
            )
            // :snippet-end:
            // :snippet-start: project
            .Project(new BsonDocument
            {
                { "ProductName", new BsonDocument("$first", "$ProductMapping.Name") },
                { "ProductCategory", new BsonDocument("$first", "$ProductMapping.Category") },
                { "OrderDate", 1 },
                { "CustomerId", 1 },
                { "Value", 1 },
                { "_id", 0 }
            });
        // :snippet-end:

        return results.ToList();
    }
}
// :replace-end: