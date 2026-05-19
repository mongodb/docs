[BsonIgnoreExtraElements]
public class LargeDocument
{
    [BsonId]
    public int Id { get; set; }
    public string LargeField { get; set; } = null!;
}
