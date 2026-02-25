Document command = new Document("collMod", "weather24h")
        .append("expireAfterSeconds", 7200); // Set expiration to 2 hours (7200 seconds)

Document result = database.runCommand(command);
