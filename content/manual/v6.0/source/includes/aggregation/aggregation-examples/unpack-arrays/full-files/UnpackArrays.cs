using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

class UnpackArrays
{
  public void PerformUnpackArrays()
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
    // end-insert-orders

    // start-unwind
    var results = orders.Aggregate()
        .Unwind<Order, OrderUnwound>(o => o.Products)
        // end-unwind
        // start-match
        .Match(o => o.Products.Price > 15)
        // end-match
        // start-group
        .Group(
            id: o => o.Products.ProductId,
            group: g => new
            {
              ProductId = g.Key,
              Product = g.First().Products.Name,
              TotalValue = g.Sum(o => o.Products.Price),
              Quantity = g.Count(),
            }
        );
    // end-group

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
  public long OrderId { get; set; }
  public List<Product> Products { get; set; }
}

public class OrderUnwound
{
  public long OrderId { get; set; }
  public Product Products { get; set; }
}

public class Product
{
  public string ProductId { get; set; }
  public string Name { get; set; }
  public int Price { get; set; }
}
// end-pocos
