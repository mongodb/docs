var matchFilter = Builders<Weather>.Filter.Eq(
    w => w.Position.Coordinates,
    new double[] { -47.9, 47.6 });

var densifyTimeRange = new DensifyDateTimeRange(
    new DensifyLowerUpperDateTimeBounds(
        lowerBound: new DateTime(1984, 3, 5, 13, 0, 0, DateTimeKind.Utc),
        upperBound: new DateTime(1984, 3, 5, 14, 0, 0, DateTimeKind.Utc)
    ),
    step: 15,
    unit: DensifyDateTimeUnit.Minutes
);

var pipeline = new EmptyPipelineDefinition<Weather>()
    .Match(matchFilter)
    .Densify(
        field: w => w.Timestamp,
        range: densifyTimeRange,
        partitionByFields: [w => w.Position.Coordinates]);
