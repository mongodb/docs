Document command = new Document("collMod", "weather24h")
        .append("expireAfterSeconds", "off");

database.runCommand(command);
