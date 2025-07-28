Aggregates.group(
    "\$${Movie::year.name}",
    Accumulators.firstN(
        "firstTwoMovies",
        "\$${Movie::title.name}",
        2
    )
)
