val resultsFlow = weatherCollection.aggregate<Weather>(
    listOf(
        Aggregates.fill(
            FillOptions.fillOptions().sortBy(ascending(Weather::hour.name)),
            FillOutputField.value(Weather::temperature.name, "23.6C"),
            FillOutputField.linear(Weather::air_pressure.name)
        )
    )
)
resultsFlow.collect { println(it) }
