using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Examples.TimeSeries.QuickStart;

// :snippet-start: model
public class Stocks
{
    [BsonId]
    public ObjectId Id { get; set; }
    [BsonElement("ticker")]
    public string Ticker { get; set; } = "";
    [BsonElement("date")]
    public DateTime Date { get; set; }
    [BsonElement("close")]
    public double Close { get; set; }
    [BsonElement("volume")]
    public double Volume { get; set; }
}
// :snippet-end:
