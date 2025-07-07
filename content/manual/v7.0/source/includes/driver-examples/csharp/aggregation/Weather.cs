public class Weather
{
    public Guid Id { get; set; }
    
    public Point Position { get; set; }
  
    [BsonElement("ts")]
    public DateTime Timestamp { get; set; }
}

public class Point
{
    public float[] Coordinates { get; set; }
}