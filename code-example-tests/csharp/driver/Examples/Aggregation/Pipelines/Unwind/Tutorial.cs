//	:replace-start: {
//	  "terms": {
//	    "_orders": "orders",
//      "_aggDB": "aggDB",
//      "GroupedResult": ""
//	  }
//	}
using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.Aggregation.Pipelines.Unwind;

public class Tutorial
{
    private IMongoDatabase? _aggDB;
    private IMongoCollection<Order>? _orders;

    public void LoadSampleData()
    {
        var uri = DotNetEnv.Env.GetString("CONNECTION_STRING", "Env variable not found. Verify you have a .env file with a valid connection string.");
        var client = new MongoClient(uri);
        _aggDB = client.GetDatabase("agg_tutorials_db");
        _orders = _aggDB.GetCollection<Order>("orders");
        // :snippet-start: load-sample-data
        // :uncomment-start:
        //var _orders = _aggDB.GetCollection<Order>("orders");
        // :uncomment-end:

        _orders.InsertMany(new List<Order>
        {
            new Order
            {
                OrderId = 6363763262239L,
                Products = new List<Product>
                {
                    new Product
                    {
                        ProductId = "abc12345",
                        Name = "Asus Laptop",
                        Price = 431
                    },
                    new Product
                    {
                        ProductId = "def45678",
                        Name = "Karcher Hose Set",
                        Price = 22
                    }
                }
            },
            new Order
            {
                OrderId = 1197372932325L,
                Products = new List<Product>
                {
                    new Product
                    {
                        ProductId = "abc12345",
                        Name = "Asus Laptop",
                        Price = 429
                    }
                }
            },
            new Order
            {
                OrderId = 9812343774839L,
                Products = new List<Product>
                {
                    new Product
                    {
                        ProductId = "pqr88223",
                        Name = "Morphy Richards Food Mixer",
                        Price = 431
                    },
                    new Product
                    {
                        ProductId = "def45678",
                        Name = "Karcher Hose Set",
                        Price = 21
                    }
                }
            },
            new Order
            {
                OrderId = 4433997244387L,
                Products = new List<Product>
                {
                    new Product
                    {
                        ProductId = "def45678",
                        Name = "Karcher Hose Set",
                        Price = 23
                    },
                    new Product
                    {
                        ProductId = "jkl77336",
                        Name = "Picky Pencil Sharpener",
                        Price = 1
                    },
                    new Product
                    {
                        ProductId = "xyz11228",
                        Name = "Russell Hobbs Chrome Kettle",
                        Price = 16
                    }
                }
            }
        });
        // :snippet-end:
    }

    public List<GroupedResult> PerformAggregation()
    {
        if (_aggDB == null || _orders == null)
        {
            throw new InvalidOperationException("You must call LoadSampleData before performing aggregation.");
        }

        // :snippet-start: unwind
        var results = _orders.Aggregate()
            .Unwind<Order, OrderUnwound>(o => o.Products)
            // :snippet-end:
            // :snippet-start: match
            .Match(o => o.Products.Price > 15)
            // :snippet-end:
            // :snippet-start: group
            .Group(
                id: o => o.Products.ProductId,
                group: g => new GroupedResult
                {
                    ProductId = g.Key,
                    Product = g.First().Products.Name,
                    TotalValue = g.Sum(o => o.Products.Price),
                    Quantity = g.Count(),
                }
            );
        // :snippet-end:
        return results.ToList();
    }
}
// :replace-end:
