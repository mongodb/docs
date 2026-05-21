var pipeline = new EmptyPipelineDefinition<Theater>()
    .GeoNear(
        GeoJson.Point(GeoJson.Geographic(-74.1, 40.95)),
        new GeoNearOptions<Theater, Theater>
        {
            DistanceField = "distance",
            MaxDistance = 8000,
            Key = "location.geo",
            Query = Builders<Theater>.Filter.Eq(
                t => t.Location.Address.State, "NJ"),
        });
