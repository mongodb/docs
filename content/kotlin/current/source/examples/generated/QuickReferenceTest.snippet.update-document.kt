collection.updateOne(
    Filters.eq(Movie::title.name, "Shrek"),
    Updates.set(Movie::rated.name, "PG")
)
