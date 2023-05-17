collection.deleteMany(
    Filters.regex(Movie::title.name, "Shrek")
)
