val resultCreateIndex = theatersCollection.createIndex(
    Indexes.geo2dsphere("${Theater::location.name}.${Theater.Location::geo.name}")
)
println("Index created: $resultCreateIndex")
