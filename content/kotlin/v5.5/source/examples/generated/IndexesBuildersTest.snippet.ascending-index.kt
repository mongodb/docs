val ascendingIndex = Indexes.ascending("name")
val indexName = collection.createIndex(ascendingIndex)
println(indexName)
