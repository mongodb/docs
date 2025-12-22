List<Bson> pipeline = Arrays.asList(
        addFields(
                new Field<>("metaData", new Document("st", "$st")
                        .append("position", "$position")
                        .append("elevation", "$elevation")
                        .append("callLetters", "$callLetters")
                        .append("qualityControlProcess", "$qualityControlProcess")
                        .append("type", "$type"))),
        project(fields(
                include("_id", "ts", "metaData", "dataSource", "airTemperature",
                        "dewPoint", "pressure", "wind", "visibility",
                        "skyCondition", "sections", "precipitationEstimatedObservation"))),
        out(new Document("db", "mydatabase")
                .append("coll", "weather_new")
                .append("timeseries", new Document("timeField", "ts")
                        .append("metaField", "metaData")
                        .append("granularity", "seconds")))
);

weatherDataColl.aggregate(pipeline).toCollection();
