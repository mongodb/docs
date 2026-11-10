using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

class GroupTotal
{
  public void PerformGroupTotal()
  {

    var uri = "<connection string>";
    var client = new MongoClient(uri);
    var aggDB = client.GetDatabase("agg_tutorials_db");

    // start-insert-orders
    var orders = aggDB.GetCollection<Order>("orders");
    orders.DeleteMany(Builders<Order>.Filter.Empty);

    orders.InsertMany(new List<Order>
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
    // end-insert-orders

    // start-match
    var results = orders.Aggregate()
        .Match(o => o.OrderDate >= DateTime.Parse("2020-01-01T00:00:00Z") &&
                    o.OrderDate < DateTime.Parse("2021-01-01T00:00:00Z"))
        // end-match
        // start-sort1
        .SortBy(o => o.OrderDate)
        // end-sort1
        // start-group
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
        // end-group
        // start-sort2
        .SortBy(c => c.FirstPurchaseDate)
        .As<BsonDocument>();
    // end-sort2

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
  public int Value { get; set; }
}
// end-pocos
