[BsonIgnoreExtraElements]
public class ImdbData
{
    [BsonElement("id")]
    public int? ImdbId { get; set; }
    [BsonElement("rating")]
    public double? Rating { get; set; }
    [BsonElement("votes")]
    public int? Votes { get; set; }
}
