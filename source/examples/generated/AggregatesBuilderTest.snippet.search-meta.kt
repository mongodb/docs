Aggregates.searchMeta(
    SearchOperator.near(1985, 2, SearchPath.fieldPath(Movie::year.name)),
    SearchOptions.searchOptions().index("year")
)
