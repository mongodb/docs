public class Order
{
    [BsonId]
    public ObjectId Id { get; set; }

    public required string CustomerId { get; set; }
    public DateTime OrderDate { get; set; }
    public required string ProductId { get; set; }
    public double Value { get; set; }
}

public class Product
{
    [BsonId]
    public required string Id { get; set; }

    public string Name { get; set; } = "";
    public string Category { get; set; } = "";
    public string Description { get; set; } = "";
}
