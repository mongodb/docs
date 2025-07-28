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
