[BsonIgnoreExtraElements]
public class Theater
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("theaterId")]
    public int TheaterId { get; set; }

    [BsonElement("location")]
    public TheaterLocation Location { get; set; } = null!;

    [BsonElement("distance")]
    public double? Distance { get; set; }
}

[BsonIgnoreExtraElements]
public class TheaterLocation
{
    [BsonElement("address")]
    public TheaterAddress Address { get; set; } = null!;
}

[BsonIgnoreExtraElements]
public class TheaterAddress
{
    [BsonElement("city")]
    public string? City { get; set; }

    [BsonElement("state")]
    public string? State { get; set; }
}
