Aggregates.group(
    "\$${Movie::year.name}",
    Accumulators.topN(
        "longestThreeMovies",
        Sorts.descending(Movie::runtime.name),
        listOf("\$${Movie::title.name}", "\$${Movie::runtime.name}"),
        3
    )
)
