val searchIdx = Document(
    "mappings",
    Document("dynamic", true)
)
val resultCreateIndex = moviesCollection.createSearchIndex("myIndex", searchIdx)
