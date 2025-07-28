val descendingIndex = Indexes.descending("capacity")
val indexName = collection.createIndex(descendingIndex)
println(indexName)
