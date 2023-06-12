val month = current().getDate("date").month(of("UTC"))
val precip = current().getInteger("precipitation")

listOf(
    Aggregates.group(
        month,
        Accumulators.avg("avgPrecipMM", precip.multiply(25.4))
))
