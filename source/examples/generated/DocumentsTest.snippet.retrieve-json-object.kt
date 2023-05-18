// val mongoClient = <code to instantiate your client>;

val query = JsonObject("{\"name\": \"Gabriel Garc\\u00eda M\\u00e1rquez\"}")
val jsonResult = collection.find(query).firstOrNull()
jsonResult?.let {
    println("query result in extended json format: " + jsonResult.json)
}
