val flow = collection.find(
    Filters.eq(Movie::year.name, 2004)
)
flow.collect { println(it) }
