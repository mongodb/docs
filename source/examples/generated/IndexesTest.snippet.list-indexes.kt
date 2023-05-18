val indexes = moviesCollection.listIndexes()
indexes.collect { println(it.toJson()) }
