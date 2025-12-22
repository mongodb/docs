timeseriesDb = mongoClient.getDatabase("mydatabase");

weatherDataColl = timeseriesDb.getCollection("weather_data");

Document sampleDocument = new Document("_id", new ObjectId("5553a998e4b02cf7151190b8"))
        .append("st", "x+47600-047900")
        .append("ts", new Date(447339600000L)) // 1984-03-05T13:00:00.000Z
        .append("position", new Document("type", "Point")
                .append("coordinates", Arrays.asList(-47.9, 47.6)))
        .append("elevation", 9999)
        .append("callLetters", "VCSZ")
        .append("qualityControlProcess", "V020")
        .append("dataSource", "4")
        .append("type", "FM-13")
        .append("airTemperature", new Document("value", -3.1).append("quality", "1"))
        .append("dewPoint", new Document("value", 999.9).append("quality", "9"))
        .append("pressure", new Document("value", 1015.3).append("quality", "1"))
        .append("wind", new Document("direction", new Document("angle", 999).append("quality", "9"))
                .append("type", "9")
                .append("speed", new Document("rate", 999.9).append("quality", "9")))
        .append("visibility", new Document("distance", new Document("value", 999999).append("quality", "9"))
                .append("variability", new Document("value", "N").append("quality", "9")))
        .append("skyCondition", new Document("ceilingHeight", new Document("value", 99999)
                .append("quality", "9").append("determination", "9"))
                .append("cavok", "N"))
        .append("sections", Arrays.asList("AG1"))
        .append("precipitationEstimatedObservation", new Document("discrepancy", "2")
                .append("estimatedWaterDepth", 999));

weatherDataColl.insertOne(sampleDocument);
