using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Examples.Aggregation.Pipelines.JoinMultiField;

// :snippet-start: pocos
public class Product
{
    [BsonId]
    public ObjectId Id { get; set; }

    public string Name { get; set; } = "";
    public string Variation { get; set; } = "";
    public string Category { get; set; } = "";
    public string Description { get; set; } = "";
}

public class Order
{
    [BsonId]
    public ObjectId Id { get; set; }

    public required string CustomerId { get; set; }
    public DateTime OrderDate { get; set; }
    public string ProductName { get; set; } = "";
    public string ProductVariation { get; set; } = "";
    public double Value { get; set; }
}
// :snippet-end: