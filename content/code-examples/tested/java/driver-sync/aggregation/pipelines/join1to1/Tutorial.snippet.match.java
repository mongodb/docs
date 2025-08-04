pipeline.add(Aggregates.match(Filters.and(
        Filters.gte("orderdate", LocalDateTime.parse("2020-01-01T00:00:00")),
        Filters.lt("orderdate", LocalDateTime.parse("2021-01-01T00:00:00"))
)));
