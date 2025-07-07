public class Theater
{
  public ObjectId Id { get; set; }

  [BsonElement("theaterId")]
  public int TheaterId { get; set; }

  [BsonElement("location")]
  public Location Location { get; set; }

  [BsonElement("distance")]
  public double? Distance { get; set; }
}

public class Location
{
  [BsonElement("address")]
  public Address Address { get; set; }

  [BsonElement("geo")]
  public GeoJsonPoint<GeoJson2DGeographicCoordinates> Geo { get; set; }
}

[BsonIgnoreExtraElements]
public class Address
{
  [BsonElement("city")]
  public string City { get; set; }

  [BsonElement("state")]
  public string State { get; set; }
}
