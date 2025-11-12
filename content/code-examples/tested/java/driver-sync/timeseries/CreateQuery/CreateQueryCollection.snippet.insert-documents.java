weather = timeSeriesDB.getCollection("weather");

weather.insertMany(
    Arrays.asList(
        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                .append("time", Date.from(Instant.parse("2021-11-18T00:00:00Z")))
                .append("temp", 45.2),
        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                .append("time", Date.from(Instant.parse("2021-11-18T06:00:00Z")))
                .append("temp", 47.3),
        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                .append("time", Date.from(Instant.parse("2021-11-18T12:00:00Z")))
                .append("temp", 49.1),
        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                .append("time", Date.from(Instant.parse("2021-11-18T18:00:00Z")))
                .append("temp", 48.8),
        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                .append("time", Date.from(Instant.parse("2021-11-19T00:00:00Z")))
                .append("temp", 43.3),
        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                .append("time", Date.from(Instant.parse("2021-11-19T06:00:00Z")))
                .append("temp", 47.2),
        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                .append("time", Date.from(Instant.parse("2021-11-19T12:00:00Z")))
                .append("temp", 51.5),
        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                .append("time", Date.from(Instant.parse("2021-11-19T18:00:00Z")))
                .append("temp", 48.2)
    )
);
