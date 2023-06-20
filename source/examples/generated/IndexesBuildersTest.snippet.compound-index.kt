val compoundIndexExample = Indexes.compoundIndex(
    Indexes.descending("capacity", "year"),
    Indexes.ascending("name")
)
val indexName = collection.createIndex(compoundIndexExample)
println(indexName)
