//	:replace-start: {
//	  "terms": {
//	    "_orders": "orders",
//      "_aggDB": "aggDB"
//	  }
//	}
using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.Aggregation.Pipelines.Group;

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
                CustomerId = "elise_smith@myemail.com",
                OrderDate = DateTime.Parse("2020-05-30T08:35:52Z"),
                Value = 231
            },
            new Order
            {
                CustomerId = "elise_smith@myemail.com",
                OrderDate = DateTime.Parse("2020-01-13T09:32:07Z"),
                Value = 99
            },
            new Order
            {
                CustomerId = "oranieri@warmmail.com",
                OrderDate = DateTime.Parse("2020-01-01T08:25:37Z"),
                Value = 63
            },
            new Order
            {
                CustomerId = "tj@wheresmyemail.com",
                OrderDate = DateTime.Parse("2019-05-28T19:13:32Z"),
                Value = 2
            },
            new Order
            {
                CustomerId = "tj@wheresmyemail.com",
                OrderDate = DateTime.Parse("2020-11-23T22:56:53Z"),
                Value = 187
            },
            new Order
            {
                CustomerId = "tj@wheresmyemail.com",
                OrderDate = DateTime.Parse("2020-08-18T23:04:48Z"),
                Value = 4
            },
            new Order
            {
                CustomerId = "elise_smith@myemail.com",
                OrderDate = DateTime.Parse("2020-12-26T08:55:46Z"),
                Value = 4
            },
            new Order
            {
                CustomerId = "tj@wheresmyemail.com",
                OrderDate = DateTime.Parse("2021-02-28T07:49:32Z"),
                Value = 1024
            },
            new Order
            {
                CustomerId = "elise_smith@myemail.com",
                OrderDate = DateTime.Parse("2020-10-03T13:49:44Z"),
                Value = 102
            }
        });
        // :snippet-end:
    }

    public List<BsonDocument> PerformAggregation()
    {
        if (_aggDB == null || _orders == null)
        {
            throw new InvalidOperationException("You must call LoadSampleData before performing aggregation.");
        }

        // :snippet-start: match
        var results = _orders.Aggregate()
            .Match(o => o.OrderDate >= DateTime.Parse("2020-01-01T00:00:00Z") &&
                        o.OrderDate < DateTime.Parse("2021-01-01T00:00:00Z"))
            // :snippet-end:
            // :snippet-start: sort-order-date
            .SortBy(o => o.OrderDate)
            // :snippet-end:
            // :snippet-start: group
            .Group(
                o => o.CustomerId,
                g => new
                {
                    CustomerId = g.Key,
                    FirstPurchaseDate = g.First().OrderDate,
                    TotalValue = g.Sum(i => i.Value),
                    TotalOrders = g.Count(),
                    Orders = g.Select(i => new { i.OrderDate, i.Value }).ToList()
                }
            )
            // :snippet-end:
            // :snippet-start: sort-first-purchase
            .SortBy(c => c.FirstPurchaseDate)
            .As<BsonDocument>();
        // :snippet-end:

        return results.ToList();
    }
}
// :replace-end:
