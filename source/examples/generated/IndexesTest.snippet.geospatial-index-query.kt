// MongoDB Headquarters in New York, NY.
val refPoint = Point(Position(-73.98456, 40.7612))
val filter = Filters.near(
    "${Theater::location.name}.${Theater.Location::geo.name}",
    refPoint, 1000.0, 0.0
)
val resultsFlow = theatersCollection.find(filter)
resultsFlow.collect { println(it) }
