val changeStream = collection.watch()
changeStream.collect {
    println("Change observed: $it")
}
