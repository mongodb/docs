data class Results(val title: String, val year: Int, val genres: List<String>)

val searchStage = Aggregates.search(
    SearchOperator.compound()
        .filter(
            listOf(
                SearchOperator.`in`(SearchPath.fieldPath(Movie::genres.name), listOf("Comedy")),
                SearchOperator.phrase(SearchPath.fieldPath(Movie::fullplot.name), "new york"),
                SearchOperator.numberRange(SearchPath.fieldPath(Movie::year.name)).gtLt(1950, 2000),
                SearchOperator.wildcard(SearchPath.fieldPath(Movie::title.name), "Love *")
            )
        )
)

val projectStage = Aggregates.project(
    Projections.include(Movie::title.name, Movie::year.name, Movie::genres.name))

val pipeline = listOf(searchStage, projectStage)
val resultsFlow = ftsCollection.aggregate<Results>(pipeline)

resultsFlow.collect { println(it) }
