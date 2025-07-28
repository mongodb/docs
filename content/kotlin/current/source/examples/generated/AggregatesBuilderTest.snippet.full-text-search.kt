Aggregates.search(
    SearchOperator.text(
        SearchPath.fieldPath(Movie::title.name), "Future"
    ),
    SearchOptions.searchOptions().index("title")
)
