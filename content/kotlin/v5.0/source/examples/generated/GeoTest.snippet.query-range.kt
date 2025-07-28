val longIslandTriangle = Polygon(
    listOf(
        Position(-72.0, 40.0),
        Position(-74.0, 41.0),
        Position(-72.0, 39.0),
        Position(-72.0, 40.0)
    )
)
val projection = Projections.fields(
    Projections.include(
        "${Theater::location.name}.${Theater.Location::address.name}.${Theater.Location.Address::city.name}"),
    Projections.excludeId()
)
val geoWithinComparison = Filters.geoWithin(
    "${Theater::location.name}.${Theater.Location::geo.name}", longIslandTriangle
)
val resultsFlow = collection.find<TheaterResults>(geoWithinComparison)
    .projection(projection)

resultsFlow.collect { println(it) }
