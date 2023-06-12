val address = current().getDocument("mailing.address")

listOf(
    Aggregates.match(
        Filters.expr(address
            .getString("state")
            .eq(of("WA"))
)))
