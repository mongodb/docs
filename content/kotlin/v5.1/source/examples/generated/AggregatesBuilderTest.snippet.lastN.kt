Aggregates.group(
    "\$${Movie::year.name}",
    Accumulators.lastN(
        "lastThreeMovies",
        "\$${Movie::title.name}",
        3
    )
)
