public class Order
{
    [BsonId]
    public ObjectId Id { get; set; }

    public string CustomerId { get; set; } = "";
    public DateTime OrderDate { get; set; }
    public int Value { get; set; }
}
