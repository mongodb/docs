Aggregates.sort(
    Sorts.orderBy(
        Sorts.descending(Movie::year.name),
        Sorts.ascending(Movie::title.name)
    )
)
