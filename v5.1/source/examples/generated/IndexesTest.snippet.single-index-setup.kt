val resultCreateIndex = moviesCollection.createIndex(Indexes.ascending(Movie::title.name))
println("Index created: $resultCreateIndex")
