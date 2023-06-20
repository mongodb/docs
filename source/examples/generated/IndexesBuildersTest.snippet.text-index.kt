val textIndex = Indexes.text("theaters")
val indexName = collection.createIndex(textIndex)
println(indexName)
