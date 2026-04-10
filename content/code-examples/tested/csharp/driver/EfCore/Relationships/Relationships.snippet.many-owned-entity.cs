[Owned]
public class Order
{
    public string Product { get; set; } = null!;
    public int Quantity { get; set; }
}

public class CustomerWithOrders
{
    public ObjectId Id { get; set; }
    public string Name { get; set; } = null!;
    public List<Order> Orders { get; set; } = new();
}
