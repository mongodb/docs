var explainCommand = new Document("explain", new Document()
        .append("aggregate", collectionName)
        .append("pipeline", pipeline)
        .append("cursor", new Document()))
        .append("verbosity", "executionStats");

Document explainResult = database.runCommand(explainCommand);
