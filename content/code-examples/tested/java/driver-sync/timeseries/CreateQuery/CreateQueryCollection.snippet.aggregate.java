// Create an aggregation pipeline
List<Document> pipeline = Arrays.asList(
        new Document("$match", new Document("sensor.sensorId", 5578)),
        new Document("$group", new Document("_id", new Document("$dateTrunc", new Document("date", "$time").append("unit", "day")))
                .append("avgTemp", new Document("$avg", "$temp"))),
        new Document("$sort", new Document("avgTemp", -1))
);

// Run the aggregation
AggregateIterable<Document> aggregationResults = weather.aggregate(pipeline);
