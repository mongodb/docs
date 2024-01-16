val index = Document(
    "mappings",
    Document("dynamic", true)
)
val resultCreateIndex = moviesCollection.createSearchIndex("myIndex", index)
