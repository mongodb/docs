val pastMonth = Windows.timeRange(-1, MongoTimeUnit.MONTH, Windows.Bound.CURRENT)

val resultsFlow = weatherCollection.aggregate<Document>(
    listOf(
       Aggregates.setWindowFields("\$${Weather::localityId.name}",
           Sorts.ascending(Weather::measurementDateTime.name),
           WindowOutputFields.sum(
               "monthlyRainfall",
               "\$${Weather::rainfall.name}",
               pastMonth
           ),
           WindowOutputFields.avg(
               "monthlyAvgTemp",
               "\$${Weather::temperature.name}",
               pastMonth
           )
       )
    )
