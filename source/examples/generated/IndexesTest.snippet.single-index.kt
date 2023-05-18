val resultCreateIndex = moviesCollection.createIndex(Indexes.ascending(Movie::title.name))
println("Index created: $resultCreateIndex")
val filter = Filters.eq(Movie::title.name, "The Dark Knight")
val sort = Sorts.ascending(Movie::title.name)
val projection = Projections.fields(
    Projections.include(Movie::title.name),
    Projections.excludeId()
)
data class Results(val title: String)
val resultsFlow = moviesCollection.find<Results>(filter).sort(sort).projection(projection)
resultsFlow.collect { println(it) }
