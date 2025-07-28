collection.replaceOne(
    Filters.eq(Movie::title.name, "Shrek"),
    Movie("Kersh", 1002, "GP")
)
