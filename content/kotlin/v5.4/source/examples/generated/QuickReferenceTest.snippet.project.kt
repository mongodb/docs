data class Result(val title: String)
    collection.find<Result>()
        .projection(Projections.include(Movie::title.name))
