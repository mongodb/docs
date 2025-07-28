val hashedIndex = Indexes.hashed("capacity")
val indexName = collection.createIndex(hashedIndex)
println(indexName)
