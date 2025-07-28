val doc = collection.find(Filters.eq("name", "Gabriel García Márquez")).firstOrNull()
doc?.let {
    println("_id: ${it.getObjectId("_id")}, name: ${it.getString("name")}, dateOfDeath: ${it.getDate("dateOfDeath")}")

    it.getList("novels", Document::class.java).forEach { novel ->
        println("title: ${novel.getString("title")}, yearPublished: ${novel.getInteger("yearPublished")}")
    }
}
