val location = current().getString("location")

listOf(
    Aggregates.match(
        Filters.expr(location.eq(of("California")))
))
