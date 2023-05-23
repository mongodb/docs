val filter = Filters.and(
    Filters.eq(Movie::type.name, "movie"),
    Filters.eq(Movie::rated.name, "G")
)
val sort = Sorts.ascending(Movie::type.name, Movie::rated.name)
val projection = Projections.fields(
    Projections.include(Movie::type.name, Movie::rated.name),
    Projections.excludeId()
)
val resultsFlow = moviesCollection.find(filter).sort(sort).projection(projection)

resultsFlow.collect { println(it) }
