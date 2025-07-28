val resultCreateIndex = moviesCollection.createIndex(Indexes.ascending(Movie::type.name, Movie::rated.name))

println("Index created: $resultCreateIndex")
