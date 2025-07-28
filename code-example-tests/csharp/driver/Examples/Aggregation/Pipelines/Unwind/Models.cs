using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Examples.Aggregation.Pipelines.Unwind;

// :snippet-start: models
public class Order
{
    [BsonId]
    public ObjectId Id { get; set; }
    public long OrderId { get; set; }
    [Required]
    public required List<Product> Products { get; set; }
}

public class OrderUnwound
{
    public long OrderId { get; set; }
    [Required]
    public required Product Products { get; set; }
}

public class Product
{
    [Required]
    public required string ProductId { get; set; }

    public string Name { get; set; } = "";
    public int Price { get; set; }
}
// :snippet-end:

public class GroupedResult
{
    public string ProductId { get; set; } = string.Empty;
    public string Product { get; set; } = string.Empty;
    public decimal TotalValue { get; set; }
    public int Quantity { get; set; }

    public override string ToString()
    {
        return $"{{ ProductId = {ProductId}, Product = {Product}, TotalValue = {TotalValue}, Quantity = {Quantity} }}";
    }
}