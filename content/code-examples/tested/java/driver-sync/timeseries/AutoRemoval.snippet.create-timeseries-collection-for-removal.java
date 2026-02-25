Document createCommand = new Document("create", "weather24h")
        .append("timeseries", new Document()
                .append("timeField", "timestamp")
                .append("metaField", "sensorId")
                .append("granularity", "seconds"))
        .append("expireAfterSeconds", 86400);

// Execute the command to create the collection
database.runCommand(createCommand);
