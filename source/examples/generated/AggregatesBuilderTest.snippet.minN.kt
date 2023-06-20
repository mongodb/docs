Aggregates.group(
    "\$${Movie::year.name}",
    Accumulators.minN(
        "lowestThreeRatings",
        "\$${Movie::imdb.name}.${Movie.IMDB::rating.name}",
        3
    )
)
