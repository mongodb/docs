val clusteredIndexOptions = ClusteredIndexOptions(Document("_id", 1), true)
val createCollectionOptions = CreateCollectionOptions().clusteredIndexOptions(clusteredIndexOptions)

database.createCollection("vendors", createCollectionOptions)
