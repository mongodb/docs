[BsonIgnoreExtraElements]
public class WeatherMeasurement
{
    [BsonId]
    public ObjectId Id { get; set; }
    [BsonElement("localityId")]
    public string LocalityId { get; set; } = null!;
    [BsonElement("measurementDateTime")]
    public DateTime MeasurementDateTime { get; set; }
    [BsonElement("rainfall")]
    public float Rainfall { get; set; }
    [BsonElement("temperature")]
    public float Temperature { get; set; }
}
