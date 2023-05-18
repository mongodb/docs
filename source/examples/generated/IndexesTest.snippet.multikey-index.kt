val resultCreateIndex =
    moviesCollection.createIndex(Indexes.ascending(Movie::rated.name, Movie::genres.name, Movie::title.name))
println("Index created: $resultCreateIndex")

val filter = Filters.and(
    Filters.eq(Movie::genres.name, "Animation"),
    Filters.eq(Movie::rated.name, "G")
)
val sort = Sorts.ascending(Movie::title.name)
val projection = Projections.fields(
    Projections.include(Movie::title.name, Movie::rated.name),
    Projections.excludeId()
)
val resultsFlow = moviesCollection.find(filter).sort(sort).projection(projection)
resultsFlow.collect { println(it) }
