val temperature = current().getInteger("temperature")

listOf(
    Aggregates.project(
        Projections.fields(
            Projections.computed("extremeTemp", temperature
                .lt(of(10))
                .or(temperature.gt(of(95))))
)))
