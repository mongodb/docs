val deliveryDate = current().getString("deliveryDate")

listOf(
    Aggregates.match(
        Filters.expr(deliveryDate
            .parseDate()
            .dayOfWeek(of("America/New_York"))
            .eq(of(2))
)))
