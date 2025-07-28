Aggregates.group(
    "\$${Movie::year.name}",
    Accumulators.maxN(
        "highestTwoRatings",
        "\$${Movie::imdb.name}.${Movie.IMDB::rating.name}",
        2
    )
)
