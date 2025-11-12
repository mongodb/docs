using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Examples.TimeSeries;

public class SensorReading(Sensor sensor, double temp, DateTime timestamp)
{
    [BsonElement("_id")]
    public BsonObjectId Id { get; } = ObjectId.GenerateNewId();
    [BsonElement("sensor")]
    public Sensor Sensor { get; set; } = sensor;
    [BsonElement("timestamp")]
    public DateTime Timestamp { get; set; } = timestamp;
    [BsonElement("temp")]
    public double Temp { get; set; } = temp;
}

public class Sensor(int id, string type)
{
    [BsonElement("sensor_id")]
    public int SensorId { get; set; } = id;
    [BsonElement("type")]
    public string type { get; set; } = type;
}