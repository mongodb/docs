// <MongoCollection setup code here>

val doc = collection.find(Filters.eq("name", "Gabriel García Márquez")).firstOrNull()
doc?.let {
    println("_id: ${it.getObjectId("_id").value}, name: ${it.getString("name").value}, dateOfDeath: ${Instant.ofEpochMilli(it.getDateTime("dateOfDeath").value).atZone(ZoneId.of("America/New_York")).toLocalDateTime()}")

    it.getArray("novels").forEach { novel ->
        val novelDocument = novel.asDocument()
        println("title: ${novelDocument.getString("title").value}, yearPublished: ${novelDocument.getInt32("yearPublished").value}")
    }
}
