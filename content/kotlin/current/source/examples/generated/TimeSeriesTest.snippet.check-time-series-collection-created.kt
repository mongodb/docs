val commandResult = database.listCollections().toList()
    .find { it["name"] == "september2021" }

println(commandResult?.toJson(JsonWriterSettings.builder().indent(true).build()))
