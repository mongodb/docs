Aggregates.group(
    "\$${Movie::year.name}",
    Accumulators.bottom(
        "shortestMovies",
        Sorts.descending(Movie::runtime.name),
        listOf("\$${Movie::title.name}", "\$${Movie::runtime.name}")
    )
)
