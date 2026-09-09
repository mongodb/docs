public class QuantizationQueryResult
{
    [BsonElement("text")]
    public string Text { get; set; } = null!;

    [BsonElement("score")]
    public double Score { get; set; }
}
