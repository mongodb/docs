val resultCreateIndex =
    moviesCollection.createIndex(Indexes.ascending(Movie::rated.name, Movie::genres.name, Movie::title.name))
println("Index created: $resultCreateIndex")
