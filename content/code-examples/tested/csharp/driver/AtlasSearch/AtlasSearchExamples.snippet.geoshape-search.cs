GeoJsonPolygon<GeoJson2DGeographicCoordinates> searchArea = new(new(new(new GeoJson2DGeographicCoordinates[]
{
    new(-93.5, 44.7),
    new(-93.5, 45.0),
    new(-93.0, 45.0),
    new(-93.0, 44.7),
    new(-93.5, 44.7),
})));

var result = theatersCollection.Aggregate()
    .Search(Builders<Theater>.Search.GeoShape(
        t => t.Location.Geo, GeoShapeRelation.Intersects, searchArea),
        indexName: "theatersgeo")
    .ToList();
