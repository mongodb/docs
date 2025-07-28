collection.updateMany(
    Filters.regex(Movie::title.name, "Shrek"),
    Updates.set(Movie::rated.name, "PG")
)
