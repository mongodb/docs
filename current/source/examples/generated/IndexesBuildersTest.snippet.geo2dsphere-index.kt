val geo2dsphereIndex = Indexes.geo2dsphere("location")
val indexName = collection.createIndex(geo2dsphereIndex)
println(indexName)
