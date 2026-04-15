[BsonIgnoreExtraElements]
public class TheaterLocation
{
    [BsonElement("geo")]
    public GeoJsonPoint<GeoJson2DGeographicCoordinates> Geo { get; set; } = null!;
}
