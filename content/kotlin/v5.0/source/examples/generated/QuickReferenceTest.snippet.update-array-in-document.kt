collection.updateOne(
    Filters.eq(Movie::title.name, "Shrek"),
    Updates.addEachToSet(Movie::genres.name, listOf("Family", "Fantasy"))
)
