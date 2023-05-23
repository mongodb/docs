val database = client.getDatabase("sample_mflix")
val collection = database.getCollection<TheaterResults>("theaters")
val centralPark = Point(Position(-73.9667, 40.78))
val query = Filters.near(
    "${Theater::location.name}.${Theater.Location::geo.name}", centralPark, 10000.0, 5000.0
)
val projection = Projections.fields(
    Projections.include(
        "${Theater::location.name}.${Theater.Location::address.name}.${Theater.Location.Address::city.name}"),
    Projections.excludeId()
)
val resultsFlow = collection.find(query).projection(projection)

resultsFlow.collect { println(it) }
