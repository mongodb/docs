public class Stocks
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("ticker")]
    public string Ticker { get; set; } = "";

    [BsonElement("symbol")]
    public string Symbol { get; set; } = "";

    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("close")]
    public double Close { get; set; }

    [BsonElement("volume")]
    public double Volume { get; set; }
}
