collection.find(
    Filters.eq(Movie::title.name, "Shrek")
).firstOrNull()
