[BsonIgnoreExtraElements]
public class Weather
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("position")]
    public Point Position { get; set; } = null!;

    [BsonElement("ts")]
    public DateTime Timestamp { get; set; }
}

public class Point
{
    [BsonElement("type")]
    public string Type { get; set; } = null!;

    [BsonElement("coordinates")]
    public double[] Coordinates { get; set; } = null!;
}
