[BsonIgnoreExtraElements]
public class ImdbData
{
    [BsonElement("rating")]
    public double? Rating { get; set; }
    [BsonElement("votes")]
    public int? Votes { get; set; }
}
