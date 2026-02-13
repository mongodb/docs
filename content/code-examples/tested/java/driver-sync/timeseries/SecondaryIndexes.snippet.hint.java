var hintPipeline = Arrays.asList(
        new Document("$sort", new Document()
                .append("metadata.sensorId", 1)
                .append("timestamp", -1)),
        new Document("$group", new Document()
                .append("_id", "$metadata.sensorId")
                .append("ts", new Document("$first", "$timestamp"))
                .append("temperatureF", new Document("$first", "$currentConditions.tempF")))
);

List<Document> hintResult = collection.aggregate(hintPipeline)
        .hint(new Document()
                .append("metadata.sensorId", 1)
                .append("timestamp", -1))
        .into(new ArrayList<>());
