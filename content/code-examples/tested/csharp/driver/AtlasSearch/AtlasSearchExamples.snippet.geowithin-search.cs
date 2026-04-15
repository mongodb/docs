GeoJsonPolygon<GeoJson2DGeographicCoordinates> searchArea = new(new(new(new GeoJson2DGeographicCoordinates[]
{
    new(-94.0, 44.5),
    new(-94.0, 45.2),
    new(-92.5, 45.2),
    new(-92.5, 44.5),
    new(-94.0, 44.5),
})));

var result = theatersCollection.Aggregate()
    .Search(Builders<Theater>.Search.GeoWithin(t => t.Location.Geo, searchArea),
        indexName: "theatersgeo")
    .ToList();
